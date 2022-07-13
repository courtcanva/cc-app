import { useEffect, useCallback, RefObject } from "react";
import { useDispatch } from "react-redux";
import { calculation } from "../utils/tileNumberCalculator";
import { changeTileQuantity, PriceBar } from "@/store/reducer/priceBarSlice";
import { useStoreSelector } from "@/store/hooks";
import { CourtAndTileInfoResult } from "@/utils/getCourtAndTileInfo";
import Konva from "konva";

export const useTileCalculation = (
  courtAndInfo: CourtAndTileInfoResult,
  canvasRef: RefObject<Konva.Layer>
) => {
  const dispatch = useDispatch();
  const courtAndTileInfo = courtAndInfo.courtAndTileInfo;
  const tileCalculation = useCallback(calculation, []);
  const tileColorState = useStoreSelector((state) => state.tile.present.court);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tileNumberResult = tileCalculation(canvasRef, courtAndTileInfo) as PriceBar[];
      dispatch(changeTileQuantity(tileNumberResult));
    }, 0);
    return () => clearTimeout(timer);
  }, [tileColorState]);
};
