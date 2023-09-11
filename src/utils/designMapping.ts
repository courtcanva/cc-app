import { IDesignDetail } from "@/interfaces/design";
import { CourtSizeState } from "@/store/reducer/courtSpecDataSlice";

export const designMapping = (design: IDesignDetail[]) => {
  const mappedDesignsData = design.map((item: IDesignDetail) => designCourtMapping(item));
  const mappedTileData = design.map((item: IDesignDetail) => designTileMapping(item));
  const mappedNameList: string[] = [];
  for (const designData of mappedDesignsData) {
    mappedNameList.push(designData.designName);
  }

  return { mappedDesignsData, mappedTileData, mappedNameList };
};

export const designCourtMapping = (item: IDesignDetail) => ({
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
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  image: item.image,
  badgeImage: item.badgeImage,
});

export const designTileMapping = (item: IDesignDetail) => ({
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
  image: item.image,
});
