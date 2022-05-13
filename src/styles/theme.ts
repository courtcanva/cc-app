import { extendTheme, ThemeConfig, theme as chakraTheme } from "@chakra-ui/react";
import Navbar from "@/styles/components/navbarBtnStyle";

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

const colors = {
  brand: {
    primary: "#344C5C",
    secondary: "#40B484",
  },
};

const components = {
  Button: { ...Navbar },
};

const overrides = {
  ...chakraTheme,
  colors,
  config,
  styles,
  components,
};

const theme = extendTheme(overrides);

export default theme;
