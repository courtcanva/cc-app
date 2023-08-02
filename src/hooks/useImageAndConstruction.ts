import Konva from "konva";
import { RefObject, useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeConstructionInfo } from "@/store/reducer/constructionSlice";
import { PIXEL_RATIO } from "@/constants/construction";
import { ConstructionInfo } from "@/store/reducer/constructionSlice";
import { useStoreSelector } from "@/store/hooks";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import { setCourtDataUrl } from "@/store/reducer/canvasControlSlice";
import useCourt from "./useCourt";

const useImageAndConstruction = (
  canvasRef: RefObject<Konva.Layer>,
  constructionInfo: ConstructionInfo
) => {
  const dispatch = useDispatch();
  const canvas = canvasRef.current;
  const rulerState = useStoreSelector((state) => state.buttonToggle.isRulerOn);
  const presentCourt = useStoreSelector((state) => state.tile.present.court);
  const { borderLength } = useCourt();
  const { beginPointX, beginPointY, endPointX, endPointY } = { ...constructionInfo };
  useEffect(() => {
    if (!canvas) return;
    dispatch(resetAll());
    rulerState ? dispatch(switchRuler(false)) : null;
    const dataUrl = canvas.toDataURL({
      x: beginPointX,
      y: beginPointY,
      width: endPointX - beginPointX,
      height: endPointY - beginPointY,
      pixelRatio: PIXEL_RATIO,
    });
    dispatch(changeConstructionInfo(constructionInfo));
    dispatch(setCourtDataUrl(dataUrl));
    rulerState ? dispatch(switchRuler(true)) : null;
  }, [beginPointX, beginPointY, endPointX, endPointY, borderLength, presentCourt, canvas]);
};

export default useImageAndConstruction;
