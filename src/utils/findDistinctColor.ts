interface RGBColor {
  R: number;
  G: number;
  B: number;
}

const hexToRGB = (hex: string): RGBColor => {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { R: r, G: g, B: b };
};

const arrayTo16 = Array.from({ length: 32 }, (v, k) => k + 1);
const colorGrid: RGBColor[] = [];
arrayTo16.forEach((r) => {
  arrayTo16.forEach((g) => {
    arrayTo16.forEach((b) => {
      colorGrid.push({ R: 8 * r - 1, G: 8 * g - 1, B: 8 * b - 1 });
    });
  });
});

const calculateContrast = (color1: RGBColor, color2: RGBColor): number => {
  // calculate luminance based on WCAG standard
  // https://www.w3.org/WAI/GL/wiki/Relative_luminance
  // https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
  const getLuminance = (color: RGBColor): number => {
    const rgb = [color.R, color.G, color.B].map((c) => {
      const cLinear = c / 255;
      return cLinear <= 0.03928 ? cLinear / 12.92 : Math.pow((cLinear + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  };
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

// Function to find the color with largest contrast ratio to closest color
export const findDistinctColor = (colors: string[]): string => {
  const colorPalette = colors.map((color) => {
    return hexToRGB(color);
  });
  let maxContrast = -Infinity;
  let distinguishedColor = { R: 0, G: 0, B: 0 };
  colorGrid.forEach((selectedColor) => {
    let minContrast = Infinity;
    colorPalette.forEach((color) => {
      const contrast = calculateContrast(color, selectedColor);
      if (contrast < minContrast) {
        minContrast = contrast;
      }
    });
    if (minContrast > maxContrast) {
      maxContrast = minContrast;
      distinguishedColor = selectedColor;
    }
  });

  const distinctHex =
    "#" +
    ((1 << 24) + (distinguishedColor.R << 16) + (distinguishedColor.G << 8) + distinguishedColor.B)
      .toString(16)
      .slice(1);
  return distinctHex;
};
