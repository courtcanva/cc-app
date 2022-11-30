import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import buttonStyles from "./components/buttonStyles";
import modal from "./modal";
import drawerButtonStyles from "./components/drawerButtonStyles";
import fontStyles from "./components/fontStyles";
import tagStyles from "./components/tagStyles";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  styles: {
    global: (props: StyleFunctionProps) => ({
      "html, body": {
        bg: props.colorMode === "dark" ? "gray.800" : "orange.50",
      },
    }),
  },
};

const colors = {
  brand: {
    primary: "#344C5C",
    secondary: "#40B484",
    primaryLight: "#496A80",
    lightGray: "#B6B6B6",
  },
  background: {
    primary: "#2C4E8A",
    secondary: "#7088B1",
    tertiary: "#FFFFFF",
    secondaryLight: "#2c5282",
    lightOrange: "#DD6B20",
    veryLightOrange: "#E18E11",
    darkRed: "#9F100F",
    lightblue: "#E2E8F0",
  },
  fontcolor: {
    primary: "#FFFFFF",
    secondary: "#1A202C",
    tertiary: "#4285f4",
    quaternary: "#C8C5C5",
    tealishBlue: "#2C4E8A",
    black: "#000000",
    green: "#40B383",
    red: "#EB4335",
    deepDark: "#000000",
    lightDark: "#344C5C",
  },
  CourtSizecolor: {
    btc: "#40B484",
    bt: "#FFFFFF",
    border: "#344C5C",
  },
  button: {
    hover: "#40B484",
    active: "#699D88",
  },
  footerSwitch: {
    500: "#40B484",
  },
  tag: {
    courtCategory: "#7c9fdf",
    courtType: "#E18E11",
  },
};

const components = {
  CourtSize: {
    baseStyle: () => ({
      width: "255",
      height: "205",
      border: "4px solid #344C5C",
      fontSize: "lg",
      fontWeight: "semibold",
      color: "#344C5C",
      textAlign: "center",
    }),
  },
  Button: { ...buttonStyles },
  Modal: { ...modal },
  Drawer: { ...drawerButtonStyles },
  Text: { ...fontStyles },
  Tag: { ...tagStyles },
  drawerButtonStyles,
};

const theme = extendTheme({
  colors,
  config,
  styles,
  components,
});

export default theme;
