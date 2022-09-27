export interface IZoomShift {
  courtXLen: number;
  courtYLen: number;
  startPoint: {
    X: number;
    Y: number;
  };
  dragPos: {
    X: number;
    Y: number;
  };
  oriRatio: number;
  zoomRatio: number;
}
