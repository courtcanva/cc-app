export const upLoadImage = async () => {
  const { default: html2canvas } = await import("html2canvas");
  const { default: AWS } = await import("aws-sdk");
  const { nanoid } = await import("nanoid");
  const court = window.document.querySelector("canvas") as HTMLCanvasElement;
  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
  const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;
  const albumPhotosKey = encodeURIComponent(albumName) + "/";
  let imageUrl = "" as string;

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,
    }),
  });

  await html2canvas(court).then(async (canvas) => {
    const imgBase64 = canvas.toDataURL("image/png");
    const base64 = await fetch(imgBase64);
    const blob = await base64.blob();
    const imgFile = new File([blob], "default", { type: "image/png" });

    const photoKey = albumPhotosKey + nanoid() + ".png";

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: imgFile,
      },
    });

    const promise = upload.promise();
    await promise.then(
      function (data) {
        imageUrl = data.Location;
      },
      function (err) {
        console.log(err.message);
      }
    );
  });

  return imageUrl;
};

export const deleteImage = async (imageUrl: string) => {
  const { default: AWS } = await import("aws-sdk");
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
  s3.deleteObject({ Bucket: albumBucketName, Key: photoKey }, function (err, data) {
    if (err) {
      return alert(`There was an error deleting your photo: , ${err.message}`);
    }
  });
};
