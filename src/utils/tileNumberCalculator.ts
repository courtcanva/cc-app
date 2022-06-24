interface hashObject {
  [prop: string]: number;
}

export const tileNumberCalculator = (
  ctx: CanvasRenderingContext2D | null,
  courtAndTileInfo: {
    beginPointX: number;
    beginPointY: number;
    endPointX: number;
    endPointY: number;
    tileSize: number;
  }
) => {
  const { beginPointX, beginPointY, endPointX, endPointY, tileSize } = courtAndTileInfo;
  const rgbaResult: hashObject = {};
  // scan horizontally
  for (let x = beginPointX; x < endPointX; x += tileSize) {
    // scan vertically
    for (let y = beginPointY; y < endPointY; y += tileSize) {
      // get r,g,b,a value of pixels in selected area
      const data = ctx?.getImageData(x, y, tileSize, tileSize).data as unknown as Array<number>;

      // refactor data to pixelColorInTile array,
      // each element is the an array contains [r,g,b,a] value of each pixel
      const pixelColorInTile = [] as Array<string>;
      for (let i = 0; i < data.length; i += 4) {
        const pixelColor = data.slice(i, i + 4).toString();
        pixelColorInTile.push(pixelColor);
      }

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

      const tileColor = determineTileColor(pixelColorInTile) as string;
      rgbaResult[tileColor] === undefined ? (rgbaResult[tileColor] = 1) : rgbaResult[tileColor]++;
    }
  }

  return rgbaResult;
};
