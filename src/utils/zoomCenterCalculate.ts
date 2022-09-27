import { IZoomShift } from "@/interfaces/zoomShift";

export const centerZoom = (zoomInfo: IZoomShift) => {
  return {
    xShift:
      -(zoomInfo.courtXLen + zoomInfo.startPoint.X * 2) *
      zoomInfo.oriRatio *
      ((zoomInfo.zoomRatio - 1) / 2),
    yShift:
      -(zoomInfo.courtYLen + zoomInfo.startPoint.Y * 2) *
      zoomInfo.oriRatio *
      ((zoomInfo.zoomRatio - 1) / 2),
  };
};
