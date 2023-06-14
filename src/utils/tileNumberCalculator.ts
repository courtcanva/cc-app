import { PriceBar } from "@/store/reducer/priceBarSlice";
import Konva from "konva";
import { Layer } from "konva/lib/Layer";
import { RefObject } from "react";
import { ITileColor } from "@/interfaces/color";

interface PixelColors {
  [prop: string]: number;
}

interface IcourtAndTileInfo {
  beginPointX: number;
  beginPointY: number;
  endPointX: number;
  endPointY: number;
  tileSize: number;
}

interface IColorList {
  name: string;
  value: string;
}

let colorListString: string[] = [];
// refactor data to pixelColorInTile array,
// each element is the an array contains [r,g,b,a] value of each pixel
const refactorData = (data: Uint8ClampedArray) => {
  let array: string[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const pixelColor = data.slice(i, i + 4).toString();
    array = array.concat([pixelColor]);
  }
  return array;
};

const determineTileColor = (arr: Array<string>) => {
  const singleTile: PixelColors = {};
  // filter out colors not included in the color list.
  arr = arr.filter((item) => colorListString.includes(item));
  arr.forEach((item) => {
    if (singleTile[item]) {
      singleTile[item]++;
    } else {
      singleTile[item] = 1;
    }
  });
  for (const key in singleTile) {
    // Eliminate interference pixels.
    if (singleTile[key] < 3 && Object.keys(singleTile).length !== 1) {
      delete singleTile[key];
    }
  }
  const colors = Object.entries(singleTile).map((item) => item[0]);
  const hexColors = rgbaToHex(colors);
  const compareHexColors = (color1: string, color2: string) => {
    const hexToDecimal = (color: string) => parseInt(color.replace("#", ""), 16);
    return hexToDecimal(color1) - hexToDecimal(color2);
  };
  // sort colors to avoid duplicate color string
  hexColors.sort(compareHexColors);
  return hexColors.join(" ");
};

export const tileNumberCalculator = (canvas: Layer | null, courtAndTileInfo: IcourtAndTileInfo) => {
  // Entire area covering the court and border for calculation.
  let { beginPointX, beginPointY, endPointX, endPointY, tileSize } = { ...courtAndTileInfo };
  let tileSizeX = tileSize;
  let tileSizeY = tileSize;
  const ctx = canvas?.getContext();
  if (canvas) {
    // DrawRatio = canvas size / canvas style size
    // Coordinates arguments passed to context.getImageData are based on canvas width/height, while coordinates from courtAndTileInfo
    // are based on style settings. Canvas width/height is automatically set by canvas behind the scene and unpredictable.
    // Sometimes the x ratio and y ratio might be slightly different.
    const drawRatioX = canvas.getCanvas()._canvas.width / canvas.getWidth();
    const drawRatioY = canvas.getCanvas()._canvas.height / canvas.getHeight();
    beginPointX *= drawRatioX;
    beginPointY *= drawRatioY;
    endPointX *= drawRatioX;
    endPointY *= drawRatioY;
    tileSizeX *= drawRatioX;
    tileSizeY *= drawRatioY;
  }
  let colorResult: PriceBar[] = [];
  // scan horizontally and vertically, end at very close but not reach to the edge to avoid blank tile
  for (let x = beginPointX; x < endPointX - 0.01; x += tileSizeX) {
    for (let y = beginPointY; y < endPointY - 0.01; y += tileSizeY) {
      // get r,g,b,a value of pixels in unit tile area
      const data = ctx?.getImageData(x, y, tileSizeX, tileSizeY).data;
      // store refactored data in pixelColorInTile
      const pixelColorInTile = refactorData(data as Uint8ClampedArray);
      // determine the color of unit tile
      const tileColor = determineTileColor(pixelColorInTile);
      // sum up tile color in colorResult
      const colorIndex = colorResult.findIndex((obj) => obj.color === tileColor);
      // if colorIndex does not exist, this tile color occur the first time, set quantity 1, otherwise quantity plus 1
      !~colorIndex
        ? (colorResult = colorResult.concat([{ color: tileColor, quantity: 1 }]))
        : (colorResult[colorIndex].quantity += 1);
    }
  }
  const sortedColorResult = colorResult.sort(
    (resultA, resultB) => resultA.color.length - resultB.color.length
  );
  return sortedColorResult;
};

export const calculation = (
  colorList: ITileColor[],
  canvasRef: RefObject<Konva.Layer>,
  courtAndTileInfo: IcourtAndTileInfo
) => {
  colorListString = colorList[0].colors.map((item: IColorList) => hexAToRgba(item.value));
  const canvas = canvasRef.current;
  if (canvas) {
    const tileNumResult = tileNumberCalculator(canvas, courtAndTileInfo);
    return tileNumResult;
  }
};

// https://css-tricks.com/converting-color-spaces-in-javascript/
// transfer rgbaString to HexString, only for solid color
const rgbaToHex = (rgbaColors: string[]) => {
  // separate numbers in rgbaString and put into an array
  const colorArray = [...rgbaColors];
  for (let i = 0; i < colorArray.length; i++) {
    const rgbaArray = colorArray[i].split(",").map((element) => Number(element));
    let r = rgbaArray[0].toString(16);
    let g = rgbaArray[1].toString(16);
    let b = rgbaArray[2].toString(16);
    r.length === 1 ? (r = "0" + r) : r;
    g.length === 1 ? (g = "0" + g) : g;
    b.length === 1 ? (b = "0" + b) : b;
    colorArray[i] = `#${r}${g}${b}`;
  }
  return colorArray;
};

const hexAToRgba = (hexString: string) => {
  let r = "0";
  let g = "0";
  let b = "0";
  if (hexString.length == 4) {
    r = "0x" + hexString[1] + hexString[1];
    g = "0x" + hexString[2] + hexString[2];
    b = "0x" + hexString[3] + hexString[3];
  } else if (hexString.length == 7) {
    r = "0x" + hexString[1] + hexString[2];
    g = "0x" + hexString[3] + hexString[4];
    b = "0x" + hexString[5] + hexString[6];
  }
  return `${+r},${+g},${+b},255`;
};
