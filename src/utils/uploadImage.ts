import { setScreenshot } from "@/store/reducer/courtStageSlice";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { RefObject } from "react";
import Konva from "konva";

export const upLoadScreenshot = async (screenshot: string) => {
  const { default: AWS } = await import(/* webpackChunkName: "aws-sdk" */ "aws-sdk");
  const { nanoid } = await import("nanoid");

  const albumBucketName = process.env.NEXT_PUBLIC_ALBUM_BUCKET_NAME as string;
  const bucketRegion = process.env.NEXT_PUBLIC_BUCKET_REGION as string;
  const IdentityPoolId = process.env.NEXT_PUBLIC_IDENTITY_POOL_ID as string;
  const albumName = process.env.NEXT_PUBLIC_ALBUM_NAME as string;
  const albumPhotosKey = encodeURIComponent(albumName) + "/";

  const base64 = await fetch(screenshot);
  const blob = await base64.blob();
  const imgFile = new File([blob], "default", { type: "image/png" });
  let imageUrl = "" as string;

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

  const promise = upload.promise();
  await promise.then(
    function (data) {
      imageUrl = data.Location;
    },
    function (err) {
      console.log(err.message);
    }
  );
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

  s3.deleteObject({ Bucket: albumBucketName, Key: photoKey }, function (err, data) {
    if (err) {
      return console.log(`Error: ${err.message}`);
    }
  });
};

export const updateCourtStage = (
  dispatch: Dispatch,
  stageRef: RefObject<Konva.Stage>,
  rulerState: boolean
) => {
  dispatch(resetAll());
  const prevRulerState = rulerState;
  prevRulerState ? dispatch(switchRuler(false)) : null;
  if (!stageRef.current) return console.log("Error in Stage node.");
  const image = stageRef.current.toDataURL({
    pixelRatio: 1,
  });
  dispatch(setScreenshot(image));
  prevRulerState ? dispatch(switchRuler(true)) : null;
};
