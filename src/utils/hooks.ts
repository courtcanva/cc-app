import { useEffect, useCallback, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { calculation } from "./tileNumberCalculator";
import { changeTileQuantity, PriceBar } from "@/store/reducer/tileSlice";
import { useStoreSelector } from "@/store/hooks";
import { CourtAndTileInfoResult } from "@/utils/getCourtAndTileInfo";

export const useTileCalculation = (
{ courtAndInfo, canvasRef }: { courtAndInfo: CourtAndTileInfoResult; canvasRef: MutableRefObject<HTMLCanvasElement>; }) => {
  const dispatch = useDispatch();
  const courtAndTileInfo = courtAndInfo.courtAndTileInfo;
  const tileCalculation = useCallback(calculation, []);
  const tileColorState = useStoreSelector((state) => state.tile.court);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tileNumberResult = tileCalculation(canvasRef, courtAndTileInfo) as PriceBar[];
      dispatch(changeTileQuantity(tileNumberResult));
    }, 100);
    return () => clearTimeout(timer);
  }, [tileColorState]);
};
