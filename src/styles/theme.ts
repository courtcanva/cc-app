import { extendTheme, ThemeConfig, theme as chakraTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: any) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "gray.800" : "orange.50",
      },
    }),
  },
};

const fonts = {
  heading: `Oswald, ${chakraTheme.fonts?.heading}`,
  body: `Oswald, ${chakraTheme.fonts?.heading}`,
};

const colors = {
  brand: {
    primary: "#344C5C",
    secondary: "#40B484",
  },
  state: {
    info: "#A6D0C6",
    success: "#39A66B",
    warning: "#E59934",
    error: "#BF1351",
  },
  black: {
    300: "#000",
    200: "#1D1D1D",
    100: "#282828",
  },
  grey: {
    500: "#333",
    400: "#4F4F4F",
    300: "#828282",
    200: "#BDBDBD",
    100: "#DEEEEA",
  },
};

const fontSize = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
};

const overrides = {
  ...chakraTheme,
  fonts,
  colors,
  config,
  styles,
  fontSize,
};

const theme = extendTheme(overrides);

export default theme;
