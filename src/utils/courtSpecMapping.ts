import { CourtSpecMapper } from "@/store/reducer/courtSpecDataSlice";

export const courtSpecMapping = (item: CourtSpecMapper, designName: string, courtId: string) => ({
  courtId: courtId,
  courtName: item.name,
  courtAreaXLength: item.length,
  courtAreaYLength: item.width,
  threePointLineToCourtEdgeLength: item.threePointLine,
  threePointLineRadius: item.threePointRadius,
  circleRadius: item.centreCircleRadius,
  keyAreaWidth: item.restrictedAreaLength,
  keyAreaHeight: item.restrictedAreaWidth,
  borderLength: item.sideBorderWidth,
  cornerThreePointLineLength: item.lengthOfCorner,
  strokeWidth: item.lineBorderWidth,
  designName: designName,
});


