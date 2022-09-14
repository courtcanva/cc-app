import { useStoreSelector } from "@/store/hooks";
import { getCourtAndTileInfo } from "@/utils/getCourtAndTileInfo";
import { useLayoutEffect, useState } from "react";
import { useTileCount } from "./useTileCount";

const useCourt = () => {
  const {
    courtAreaXLength,
    courtAreaYLength,
    threePointLineRadius,
    threePointLineToCourtEdgeLength,
    borderLength,
    // } = useStoreSelector((state) => state.courtSize);
  } = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const stageMargin = 2500;
  // componentsStartPoint is different court area start point
  const componentsStartPoint = {
    X: stageMargin,
    Y:
      -(
        (threePointLineRadius + threePointLineToCourtEdgeLength) * 2 -
        (courtAreaYLength + stageMargin * 2)
      ) / 2,
  };
  const courtStartPoint = {
    X: stageMargin,
    Y: stageMargin,
  };

  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const court = getCourtAndTileInfo(
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    stageMargin,
    size
  ).court;

  useTileCount();

  useLayoutEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return {
    courtAreaXLength,
    courtAreaYLength,
    borderLength,
    court,
    stageMargin,
    courtStartPoint,
    componentsStartPoint,
  };
};

export default useCourt;
