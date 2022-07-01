import { MutableRefObject } from "react";
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

interface IcolorResult {
  color: string;
  quantity: number;
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
  const colorResult: IcolorResult[] = [];
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
      // sum up tile color in colorResult
      const colorIndex = colorResult.findIndex((obj) => obj.color === tileColor);
      // if colorIndex does not exist, set quantity 1, otherwise quantity plus 1
      !~colorIndex
        ? colorResult.push({ color: tileColor, quantity: 1 })
        : (colorResult[colorIndex].quantity += 1);
    }
  }

  // remove object in result that color is null
  const filteredResult = colorResult.filter((obj) => obj.color);

  // transfer rgba to hex of colorResult
  filteredResult.forEach((obj) => {
    obj.color && (obj.color = rgbaToHex(obj.color));
  });

  return filteredResult;
};

export const debouncedCalculation = (
  canvasRef: MutableRefObject<null>,
  courtAndTileInfo: IcourtAndTileInfo
) => {
  const canvas = canvasRef.current as unknown as HTMLCanvasElement;
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const tileNumResult = tileNumberCalculator(ctx, courtAndTileInfo);
    return tileNumResult;
  }
};

// transfer rgbaString to HexString, only for solid color
const rgbaToHex = (rgbaString: string) => {
  // separate numbers in rgbaString and put into an array
  const rgbaArray = rgbaString.split(",").map((element) => Number(element));
  let r = rgbaArray[0].toString(16);
  let g = rgbaArray[1].toString(16);
  let b = rgbaArray[2].toString(16);
  const a = rgbaArray[3];
  // only transfer solid color with a=255
  if (a === 255) {
    r.length === 1 ? (r = "0" + r) : r;
    g.length === 1 ? (g = "0" + g) : g;
    b.length === 1 ? (b = "0" + b) : b;
    return "#" + r + g + b;
  } else {
    // otherwise return original rgbaString
    return rgbaString;
  }
};
