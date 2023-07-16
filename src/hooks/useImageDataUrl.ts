import { useStoreSelector } from "@/store/hooks";
import { useEffect } from "react";
import useCourt from "@/hooks/useCourt";
import { useDispatch } from "react-redux";
import { setCourtDataUrl } from "@/store/reducer/canvasControlSlice";
import { switchRuler } from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { RefObject } from "react";
import Konva from "konva";

const useImageDataUrl = (stageRef: RefObject<Konva.Stage>) => {
  const dispatch = useDispatch();
  const { borderLength } = useCourt();
  const presentCourt = useStoreSelector((state) => state.tile.present.court);
  const rulerState = useStoreSelector((state) => state.buttonToggle.isRulerOn);
  const isBadgeLoaded = useStoreSelector((state) => state.badge.isBadgeLoaded);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!stageRef.current) return;
      dispatch(resetAll());
      rulerState ? dispatch(switchRuler(false)) : null;
      const image = stageRef.current.toDataURL({
        pixelRatio: 1.5,
      });
      dispatch(setCourtDataUrl(image));
      rulerState ? dispatch(switchRuler(true)) : null;
    }, 100); // set 100ms delay to avoid transit effect disturb getting correct image data.
    return () => clearTimeout(timer);
  }, [borderLength, presentCourt, isBadgeLoaded]);
};

export default useImageDataUrl;
