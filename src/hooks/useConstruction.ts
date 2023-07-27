import Konva from "konva";
import { RefObject, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeConstructionSrc, changeConstructionInfo } from "@/store/reducer/constructionSlice";
import { PIXEL_RATIO } from "@/constants/construction";
import { ConstructionInfo } from "@/store/reducer/constructionSlice";

export const useConstruction = (
  canvasRef: RefObject<Konva.Layer>,
  constructionInfo: ConstructionInfo
) => {
  const dispatch = useDispatch();
  const canvas = canvasRef.current;
  let { beginPointX, beginPointY } = { ...constructionInfo };
  useEffect(() => {
    if (!canvas) return;
    const drawRatioX = canvas.getCanvas()._canvas.width / canvas.getWidth();
    const drawRatioY = canvas.getCanvas()._canvas.height / canvas.getHeight();
    beginPointX *= drawRatioX;
    beginPointY *= drawRatioY;
    const canvasWidth = canvas.getCanvas()._canvas.width;
    const canvasHeight = canvas.getCanvas()._canvas.height;
    const dataUrl = canvas.toDataURL({
      x: beginPointX,
      y: beginPointY,
      width: canvasWidth,
      height: canvasHeight,
      pixelRatio: PIXEL_RATIO,
    });
    dispatch(changeConstructionSrc(dataUrl));
    dispatch(changeConstructionInfo(constructionInfo));
  }, [constructionInfo]);
};
