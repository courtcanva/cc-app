import { Area } from "react-easy-crop/types";

const generateImageFromDataUrl = async (courtDataUrl: string) => {
  const base64 = await fetch(courtDataUrl);
  const blob = await base64.blob();
  return new File([blob], "default", { type: "image/jpeg" });
};

export const upLoadScreenshot = async (courtDataUrl: string, toast: any) => {
  const { default: AWS } = await import(/* webpackChunkName: "aws-sdk" */ "aws-sdk");
  const { nanoid } = await import("nanoid");

  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
  const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  const imgFile = await generateImageFromDataUrl(courtDataUrl);

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });
  const photoKey = albumPhotosKey + nanoid() + ".jpeg";
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: imgFile,
      ContentType: "image/jpeg",
    },
  });

  const imageUrl = (await upload.promise()).Location;
  if (!imageUrl) {
    return toast({
      title: "Image update failure.",
      description: "Try again or contact IT support",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  }
  return imageUrl;
};

export const deleteImage = async (imageUrl: string) => {
  const { default: AWS } = await import(/* webpackChunkName: "aws-sdk" */ "aws-sdk");

  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
  const photoKey = imageUrl.split("amazonaws.com/")[1] as string;

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName },
  });

  s3.deleteObject({ Bucket: albumBucketName, Key: photoKey });
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
