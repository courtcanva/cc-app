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
  const { beginPointX, beginPointY, endPointX, endPointY } = { ...constructionInfo };
  useEffect(() => {
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({
      x: beginPointX,
      y: beginPointY,
      width: endPointX - beginPointX,
      height: endPointY - beginPointY,
      pixelRatio: PIXEL_RATIO,
    });
    dispatch(changeConstructionSrc(dataUrl));
    dispatch(changeConstructionInfo(constructionInfo));
  }, [constructionInfo]);
};
