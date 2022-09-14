import { ICourtRatioProps } from "@/interfaces/courtRatio";

const courtRatio = (courtData: ICourtRatioProps) => {
  const court = {
    stageWidth: 0,
    stageHeight: 0,
    courtRatio: 0,
  };

  const convasWidth = courtData.courtAreaX + courtData.margin * 2;
  const convasHeight = courtData.courtAreaY + courtData.margin * 2;

  courtData.windowHeight >= 768
    ? (court.stageHeight = courtData.windowHeight - 250)
    : (court.stageHeight = 768 - 250);
  court.stageWidth = court.stageHeight * (convasWidth / convasHeight);

  if ((courtData.windowHeight - 250) / (courtData.windowWidth - 118) > convasHeight / convasWidth) {
    courtData.windowWidth >= 768
      ? (court.stageWidth = courtData.windowWidth - 118)
      : (court.stageWidth = 768 - 118);
    court.stageHeight = court.stageWidth * (convasHeight / convasWidth);
  }

  court.courtRatio = court.stageHeight / (courtData.courtAreaY + courtData.margin * 2);

  return court;
};

export default courtRatio;
