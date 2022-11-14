const generateImageFromDataUrl = async (courtDataUrl: string) => {
  const base64 = await fetch(courtDataUrl);
  const blob = await base64.blob();
  return new File([blob], "default", { type: "image/jpeg" });
};

export const upLoadScreenshot = async (dataUrl: string, toast: any) => {
  const { default: AWS } = await import(/* webpackChunkName: "aws-sdk" */ "aws-sdk");
  const { nanoid } = await import("nanoid");

  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
  const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  const imgFile = await generateImageFromDataUrl(dataUrl);

  /*
  const regex1 = /data:image\//;
  const regex2 = /;base64.+/;
  const suffix = dataUrl.replace(regex1, "").replace(regex2, "");
  */
  const suffix = "jpeg";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });
  const photoKey = albumPhotosKey + nanoid() + `.${suffix}`;
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: imgFile,
      ContentType: `image/${suffix}`,
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
  const allowedTypes = [".jpg", ".png", ".jpeg"];
  const imgPath = img.name;
  const imgFormat = imgPath.substring(imgPath.indexOf("."));
  const imgSize = img.size / 1024;

  if (allowedTypes.indexOf(imgFormat) < 0) {
    toast({
      title: "Incorrect image format",
      description: "Image format is not acceptable.",
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "bottom-left",
    });
    return false;
  }
  if (imgSize > maxSizeInKB) {
    toast({
      title: "Size too large",
      description: `Image size must less than ${maxSizeInKB} KB!`,
      status: "error",
      duration: 9000,
      isClosable: true,
      position: "bottom-left",
    });
    return false;
  }

  if (imgSize < minSizeInKB) {
    toast({
      title: "Resolution hint",
      description: `Image size less than ${minSizeInKB} KB, it may cause resolution issues.`,
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "bottom-left",
    });
  }

  return true;
};
