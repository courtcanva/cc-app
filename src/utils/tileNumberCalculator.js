// to change later for different screen size and courts
const initPointX = 100;
const initPointY = 100;
const courtLength = 1500;
const courtHeight = 850;
const tileSize = 15;

export const tileNumberCalculator = (ctx) => {
  const result = {};
  // scan horizontally
  for (let x = initPointX; x < courtLength; x += tileSize) {
    // scan vertically
    for (let y = initPointY; y < courtHeight; y += tileSize) {
      // get r,g,b,a value of pixels in selected area
      const data = ctx?.getImageData(x, y, tileSize, tileSize).data;

      // set the color that takes most pixels as the tile color
      // by finding the most repeated element in pixelColorInTile array
      const determineTileColor = (arr) => {
        const hash = {};
        let maxNum = 0;
        let maxEle = null;
        for (let i = 0; i < arr.length; i++) {
          hash[arr[i]] === undefined ? (hash[arr[i]] = 1) : hash[arr[i]]++;
          if (hash[arr[i]] > maxNum) {
            maxEle = arr[i];
            maxNum = hash[arr[i]];
          }
        }
        return maxEle;
      };

      // refactor data to pixelColorInTile array,
      // each element is the an array contains [r,g,b,a] value of each pixel
      const pixelColorInTile = [];
      for (let i = 0; i < data.length; i += 4) {
        const pixelColor = data.slice(i, i + 4);
        pixelColorInTile.push(pixelColor);
      }

      const tileColor = determineTileColor(pixelColorInTile);
      result[tileColor] === undefined ? (result[tileColor] = 1) : result[tileColor]++;
    }
  }
  console.log(result);
};
