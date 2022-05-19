import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/theme-tools";
import buttonStyles from "./components/buttonStyles";

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
  background:{
    primary : "#2C3333"
  },
  fontcolor:{
    primary : "#C8C5C5",
  },
  footerSwitch:{
    500:"#8FE9C3",
  },
};

const components = {
  Button: { ...buttonStyles },
};

const theme = extendTheme({ colors, config, styles, components});

export default theme;
