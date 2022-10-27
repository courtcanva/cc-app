const generateImageFromDataUrl = async (courtDataUrl: string) => {
  const base64 = await fetch(courtDataUrl);
  const blob = await base64.blob();
  return new File([blob], "default", { type: "image/png" });
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
  const photoKey = albumPhotosKey + nanoid() + ".png";
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: albumBucketName,
      Key: photoKey,
      Body: imgFile,
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
