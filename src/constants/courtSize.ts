import { createContext } from "react";

export const MIN_DIMENSION_BOX = 1000;
export const STAGE_MARGIN = 2500;
const startPoint = {
  X: STAGE_MARGIN,
  Y: STAGE_MARGIN,
};
export const START_POINT = createContext(startPoint);