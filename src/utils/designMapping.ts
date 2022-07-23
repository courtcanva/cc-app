import { IDesign, ITileColor } from "@/interfaces/design";

export const designCourtMapping = (item: IDesign) => ({
  courtId: item._id,
  courtName: item.courtSize.name,
  courtAreaXLength: item.courtSize.length,
  courtAreaYLength: item.courtSize.width,
  threePointLineToCourtEdgeLength: item.courtSize.threePointLine,
  threePointLineRadius: item.courtSize.threePointRadius,
  circleRadius: item.courtSize.centreCircleRadius,
  keyAreaWidth: item.courtSize.restrictedAreaLength,
  keyAreaHeight: item.courtSize.restrictedAreaWidth,
  borderLength: item.courtSize.sideBorderWidth,
  cornerThreePointLineLength: item.courtSize.lengthOfCorner,
  strokeWidth: item.courtSize.lineBorderWidth,
  designName: item.designName,
});

export const designTileMapping = (item: IDesign) => ({
  designId: item._id,
  tileColor: item.tileColor,
});

export const designNameMapping = (item: IDesign) => ({
  designName: item.designName,
});


