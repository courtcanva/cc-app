import { changeTileColor } from "@/store/reducer/tileSlice";
import { useDispatch } from "react-redux";

export const useColorHandler = (selectedColor: string, location: string) => {
  const dispatch = useDispatch();
  return () => {
    if (selectedColor === "transparent") return;
    dispatch(changeTileColor({ selectedColor, location }));
  };
};
