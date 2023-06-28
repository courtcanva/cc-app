export const getInvertColor = (colorArray: string[]) => {
  let rTotal = 0;
  let gTotal = 0;
  let bTotal = 0;

  colorArray.forEach((color) => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    rTotal += r;
    gTotal += g;
    bTotal += b;
  });

  const rAverage = Math.round(rTotal / colorArray.length);
  const gAverage = Math.round(gTotal / colorArray.length);
  const bAverage = Math.round(bTotal / colorArray.length);

  const brightness = (rAverage * 299 + gAverage * 587 + bAverage * 114) / 1000;
  return brightness >= 128 ? "#000000" : "#FFFFFF";
};
