import { IDesign } from "@/interfaces/design";
import { CourtSizeState } from "@/store/reducer/courtSpecDataSlice";

export const designMapping = (design: IDesign[]) => {
  const mappedDesignsData = design.map((item: IDesign) => designCourtMapping(item));
  const mappedtileData = design.map((item: IDesign) => designTileMapping(item));
  const mappedNameList: string[] = [];
  for (const designData of mappedDesignsData) {
    mappedNameList.push(designData.designName);
  }

  return {mappedDesignsData, mappedtileData, mappedNameList}
};

const designCourtMapping = (item: IDesign) => ({
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

const designTileMapping = (item: IDesign) => ({
  courtId: item._id,
  tileColor: item.tileColor,
});

export const saveDesignMapping = (item: CourtSizeState) => ({
  name: item.courtName,
  length: item.courtAreaXLength,
  width: item.courtAreaYLength,
  threePointLine: item.threePointLineToCourtEdgeLength,
  threePointRadius: item.threePointLineRadius,
  centreCircleRadius: item.circleRadius,
  restrictedAreaLength: item.keyAreaWidth,
  restrictedAreaWidth: item.keyAreaHeight,
  sideBorderWidth: item.borderLength,
  lengthOfCorner: item.cornerThreePointLineLength,
  lineBorderWidth: item.strokeWidth,
  designName: item.designName,
});


