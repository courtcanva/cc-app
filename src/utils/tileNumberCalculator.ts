import { MutableRefObject } from "react";
import debounce from "lodash.debounce";
interface hashObject {
  [prop: string]: number;
}

interface IcourtAndTileInfo {
  beginPointX: number;
  beginPointY: number;
  endPointX: number;
  endPointY: number;
  tileSize: number;
}

// refactor data to pixelColorInTile array,
// each element is the an array contains [r,g,b,a] value of each pixel
const refactorData = (data: number[]) => {
  const array = [];
  for (let i = 0; i < data.length; i += 4) {
    const pixelColor = data.slice(i, i + 4).toString();
    array.push(pixelColor);
  }
  return array;
};

// set the color that takes most pixels as the tile color
// by finding the most repeated element in pixelColorInTile array
const determineTileColor = (arr: Array<string>) => {
  const hash: hashObject = {};
  let maxNum = 0;
  let mostEle = null;
  for (let i = 0 as number; i < arr.length; i++) {
    // ignore white, black and blank color
    arr[i] === "0,0,0,0" || arr[i] === "0,0,0,255" || arr[i] === "255,255,255,255"
      ? (hash[arr[i]] = -1)
      : hash[arr[i]] === undefined
      ? (hash[arr[i]] = 1)
      : hash[arr[i]]++;

    if (hash[arr[i]] > maxNum) {
      mostEle = arr[i];
      maxNum = hash[arr[i]];
    }
  }
  return mostEle;
};

export const tileNumberCalculator = (
  ctx: CanvasRenderingContext2D | null,
  courtAndTileInfo: IcourtAndTileInfo
) => {
  const { beginPointX, beginPointY, endPointX, endPointY, tileSize } = courtAndTileInfo;
  const rgbaResult: hashObject = {};
  // scan horizontally
  for (let x = beginPointX; x < endPointX; x += tileSize) {
    // scan vertically
    for (let y = beginPointY; y < endPointY; y += tileSize) {
      // get r,g,b,a value of pixels in unit tile area
      const data = ctx?.getImageData(x, y, tileSize, tileSize).data as unknown as Array<number>;
      // store refactored data in pixelColorInTile
      const pixelColorInTile = refactorData(data);
      // determine the color of unit tile
      const tileColor = determineTileColor(pixelColorInTile) as string;
      // sum up tile color in rgbaResult
      rgbaResult[tileColor] === undefined ? (rgbaResult[tileColor] = 1) : rgbaResult[tileColor]++;
    }
  }
  return rgbaResult;
};

export const debouncedCalculation = debounce(
  (canvasRef: MutableRefObject<null>, courtAndTileInfo: IcourtAndTileInfo) => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const tileNumResult = tileNumberCalculator(ctx, courtAndTileInfo);
      // To Delete later, console for preview only
      console.log(tileNumResult);
      return tileNumResult;
    }
  },
  500
);
