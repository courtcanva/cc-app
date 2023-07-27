import { Area } from "react-easy-crop/types";

const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;

const generateImageFromDataUrl = async (courtDataUrl: string) => {
  const base64 = await fetch(courtDataUrl);
  const blob = await base64.blob();
  return new File([blob], "default", { type: "image/jpeg" });
};

const setupS3ClientWithCognito = async () => {
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const { S3Client } = await import("@aws-sdk/client-s3");
  const { CognitoIdentityClient, GetIdCommand, GetCredentialsForIdentityCommand } = await import(
    "@aws-sdk/client-cognito-identity"
  );
  const identityClient = new CognitoIdentityClient({ region: bucketRegion });
  const identityId = await identityClient.send(
    new GetIdCommand({ IdentityPoolId: IdentityPoolId })
  );
  const { Credentials } = await identityClient.send(
    new GetCredentialsForIdentityCommand({ IdentityId: identityId.IdentityId })
  );
  const s3 = new S3Client({
    region: bucketRegion,
    credentials: {
      accessKeyId: Credentials?.AccessKeyId || "",
      secretAccessKey: Credentials?.SecretKey || "",
      sessionToken: Credentials?.SessionToken || "",
    },
  });
  return s3;
};

export const upLoadScreenshot = async (courtDataUrl: string, toast: any) => {
  const { nanoid } = await import("nanoid");
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  const photoKey = albumPhotosKey + nanoid() + ".jpeg";
  const { PutObjectCommand } = await import("@aws-sdk/client-s3");
  const imgFile = await generateImageFromDataUrl(courtDataUrl);
  try {
    const s3Client = await setupS3ClientWithCognito();
    const upload = new PutObjectCommand({
      Bucket: albumBucketName,
      Key: photoKey,
      Body: imgFile,
      ContentType: "image/jpeg",
    });
    await s3Client.send(upload);
    const imageUrl = `https://${albumBucketName}.s3.${bucketRegion}.amazonaws.com/${photoKey}`;
    return imageUrl;
  } catch (error) {
    return toast({
      title: "Image update failure.",
      description: "Try again or contact IT support",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
};

export const deleteImage = async (imageUrl: string) => {
  const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const photoKey = imageUrl.split("amazonaws.com/")[1] as string;
  const s3Client = await setupS3ClientWithCognito();
  const deleteCommand = new DeleteObjectCommand({ Bucket: albumBucketName, Key: photoKey });
  s3Client.send(deleteCommand);
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const inputImageCheck = (
  img: File,
  minSizeInKB: number,
  maxSizeInKB: number,
  toast: any
) => {
  const allowedTypes = ["image/jpg", "image/png", "image/jpeg"];
  const imgFormat = img.type;
  const imgSize = img.size / 1024;

  if (!allowedTypes.includes(imgFormat)) {
    toast({
      title: "Incorrect file format",
      description: "File format not supported. Please choose a valid image file",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return false;
  }
  if (imgSize > maxSizeInKB) {
    toast({
      title: "Size too large",
      description: `Image size must less than ${maxSizeInKB} KB!`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    return false;
  }

  if (imgSize < minSizeInKB) {
    toast({
      title: "Resolution hint",
      description: `Image size less than ${minSizeInKB} KB, it may cause resolution issues.`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }

  return true;
};

const createImage = (url: string) => {
  const image = new Image();
  image.src = url;
  return image;
};

const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  const image = createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);
  return canvas;
};
