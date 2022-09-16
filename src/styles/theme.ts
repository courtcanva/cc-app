import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import buttonStyles from "./components/buttonStyles";
import modal from "./modal";
import drawerButtonStyles from "./components/drawerButtonStyles";

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
  },
  background: {
    primary: "#2C4E8A",
    secondary: "#7088B1",
    tertiary: "#FFFFFF",
    secondaryLight: "#2c5282",
    tomato: "#FF6347",
  },
  fontcolor: {
    primary: "#FFFFFF",
    secondary: "#1A202C",
    tertiary: "#4285f4",
    quaternary: "#C8C5C5",
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
  drawerButtonStyles,
};

const theme = extendTheme({
  colors,
  config,
  styles,
  components,
});

export default theme;
