import { useStoreSelector } from "@/store/hooks";

const { borderLength } = useStoreSelector(
  (state) => state.courtSize
);
export const dimensionColor = borderLength < 1000 ? ("black") : ("white");
export const minDimensionBox = 1000;