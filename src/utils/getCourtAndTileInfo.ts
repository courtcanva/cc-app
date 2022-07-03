import courtRatio from "./courtRatio";

interface ISize {
  width: number;
  height: number;
}

export const getCourtAndTileInfo = (
  courtAreaXLength: number,
  courtAreaYLength: number,
  borderLength: number,
  stageMargin: number,
  size: ISize
) => {
  const courtData = {
    courtAreaX: courtAreaXLength,
    courtAreaY: courtAreaYLength,
    margin: stageMargin,
    windowHeight: size.height,
    windowWidth: size.width,
  };

  const court = courtRatio(courtData);

  const courtAndTileInfo = {
    beginPointX: (stageMargin - borderLength) * court.courtRatio,
    beginPointY: (stageMargin - borderLength) * court.courtRatio,
    endPointX: (stageMargin + courtAreaXLength + borderLength) * court.courtRatio,
    endPointY: (stageMargin + courtAreaYLength + borderLength) * court.courtRatio,
    // TO CHANGE LATER: tile size will be passed in instead of hard coding
    tileSize: 300 * court.courtRatio,
  };

  return { court, courtAndTileInfo };
};
