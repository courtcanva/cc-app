import { useEffect, useCallback, RefObject } from "react";
import { useDispatch } from "react-redux";
import { calculation } from "../utils/tileNumberCalculator";
import { changeTileQuantity, PriceBar } from "@/store/reducer/priceBarSlice";
import { useStoreSelector } from "@/store/hooks";
import useCourt from "@/hooks/useCourt";
import Konva from "konva";

export const useTileCalculation = (canvasRef: RefObject<Konva.Layer>) => {
  const dispatch = useDispatch();
  const tileCalculation = useCallback(calculation, []);
  const tileColorState = useStoreSelector((state) => state.tile.present.court);
  const { colorList } = useStoreSelector((state) => state.colorList);
  const { courtAndTileInfo, borderLength } = useCourt();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (colorList.length === 0) return;
      const tileNumberResult = tileCalculation(
        colorList,
        canvasRef,
        courtAndTileInfo
      ) as PriceBar[];
      dispatch(changeTileQuantity(tileNumberResult));
    }, 100); // set 100ms delay to avoid transit effect disturb getting correct image data.
    return () => clearTimeout(timer);
  }, [tileColorState, borderLength, colorList]);
};
