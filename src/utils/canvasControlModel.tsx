import { IZoomShift } from "@/interfaces/zoomShift";
import { useStoreSelector } from "@/store/hooks";
import { dragState } from "@/store/reducer/canvasControlSlice";
import { centerZoom } from "@/utils/zoomCenterCalculate";
import { useDispatch } from "react-redux";

const canvasControlModel = (zoomShift: IZoomShift) => {
  const dispatch = useDispatch();
  const { zoomScale, resetState } = useStoreSelector((state) => state.canvasControl);
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const { dragActivate, dragStart } = useStoreSelector((state) => state.canvasControl);

  const { xShift, yShift } = centerZoom(zoomShift, zoomScale);

  const handleCursorChange = () => {
    document.body.style.cursor = "auto";
  };

  const handleMouseDragStart = () => {
    dispatch(dragState(true));
    document.body.style.cursor = "pointer";
  };

  const canvasStates = {
    zoomScale: zoomScale,
    resetState: resetState,
    selectedColor: selectedColor,
    dragActivate: dragActivate,
    dragStart: dragStart,
  };

  return {
    xShift,
    yShift,
    canvasStates,
    handleMouseDragStart,
    handleCursorChange,
  };
};
export default canvasControlModel;
