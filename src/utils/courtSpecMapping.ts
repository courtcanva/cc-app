import { CourtSpecMapper } from "@/store/reducer/courtSpecDataSlice";

export const courtSpecMapping = (item: CourtSpecMapper) => ({
  courtId: item._id,
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
});


