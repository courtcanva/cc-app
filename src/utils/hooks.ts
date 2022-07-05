import { useEffect, useCallback, MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { calculation } from "./tileNumberCalculator";
import { changeTileQuantity } from "@/store/reducer/tileSlice";
import { useStoreSelector } from "@/store/hooks";
import { CourtAndTileInfoResult } from "@/utils/getCourtAndTileInfo";

const dispatch = useDispatch();

const tileCalculation = useCallback(calculation, []);

export const useTileCalculation = (
  courtAndInfo: CourtAndTileInfoResult,
  canvasRef: MutableRefObject<HTMLCanvasElement>
) => {
  const courtAndTileInfo = courtAndInfo.courtAndTileInfo;

  const tileColorState = useStoreSelector((state) => state.tile.court);

  useEffect(() => {
    const timer = setTimeout(() => {
      const tileNumberResult = tileCalculation(canvasRef, courtAndTileInfo);
      dispatch(changeTileQuantity(tileNumberResult));
    }, 100);
    return () => clearTimeout(timer);
  }, [tileColorState]);
};
