import { colors } from "@/styles/theme";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import { changeStrokeColor } from "@/store/reducer/strokeColorSlice";

const initialColor = "white";

const useDispatchStrokeColor = () => (location: string) => {
  const dispatch = useDispatch();
  const selectedColor = useStoreSelector((state) => state.courtColor.selectedColor);
  const strokeColor = useStoreSelector(
    (state) =>
      state.strokeColor.courts?.find((strokeColor) => strokeColor.location.includes(location))?.strokeColor
  );

  if (selectedColor === "none") return { stroke: initialColor };

  return {
    stroke: strokeColor,
    onMouseEnter: () =>
      dispatch(changeStrokeColor({ strokeColor: colors.brand.secondary, location })),
    onMouseLeave: () => dispatch(changeStrokeColor({ strokeColor: initialColor, location })),
  };
};

export default useDispatchStrokeColor;
