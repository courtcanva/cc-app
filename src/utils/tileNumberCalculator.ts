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

// set the color that takes most pixels as the tile color
// by finding the most repeated element in pixelColorInTile array
const determineTileColor = (arr: Array<string>) => {
  const singleTile: PixelColors = {};
  // filter out white and no solid colors
  arr = arr.filter((item) => colorListString.includes(item));
  arr.forEach((item) => {
    if (singleTile[item]) {
      singleTile[item]++;
    } else {
      singleTile[item] = 1;
    }
  });
  for (const key in singleTile) {
    if (singleTile[key] < 5) {
      delete singleTile[key];
    }
  }
  const colors = Object.entries(singleTile).map((item) => item[0]);
  const hexColors = rgbaToHex(colors);
  // if (singleTile[mostTwoColors[1]] < 20) {
  //   mostTwoColors.pop();
  // }
  const compareHexColors = (color1: string, color2: string) => {
    const hexToDecimal = (color: string) => parseInt(color.replace("#", ""), 16);
    return hexToDecimal(color1) - hexToDecimal(color2);
  };
  hexColors.sort(compareHexColors);
  return hexColors.join(" ");
};

export const tileNumberCalculator = (
  canvas: Layer | null, // Canva's context 2D information including pixel's color
  courtAndTileInfo: IcourtAndTileInfo // Coordinates of important points of the specific area
) => {
  let { beginPointX, beginPointY, endPointX, endPointY, tileSize } = { ...courtAndTileInfo };
  const ctx = canvas?.getContext();
  if (canvas) {
    const drawRatio = canvas.getCanvas()._canvas.width / canvas.getWidth();
    beginPointX *= drawRatio;
    beginPointY *= drawRatio;
    endPointX *= drawRatio;
    endPointY *= drawRatio;
    tileSize *= drawRatio;
  }
  let colorResult: PriceBar[] = [];
  console.time("codeExecution");
  // scan horizontally
  for (let x = beginPointX; x < endPointX; x += tileSize) {
    // scan vertically
    for (let y = beginPointY; y < endPointY; y += tileSize) {
      // get r,g,b,a value of pixels in unit tile area
      const data = ctx?.getImageData(x, y, tileSize, tileSize).data;
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
  console.log(`courtAndTileInfo ${JSON.stringify(courtAndTileInfo)}`);
  colorListString = colorList[0].colors.map((item: IColorList) => hexAToRGBA(item.value));
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

const hexAToRGBA = (hexString: string) => {
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
