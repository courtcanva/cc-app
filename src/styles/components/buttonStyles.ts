const buttonStyles = {
  variants: {
    navbarIconBtn: {
      bg: "transparent",
      color: "white",
      fontSize: "xl",
      _hover: { bg: "brand.primaryLight" },
      size: "sm",
    },
    shareBtn: {
      bg: "brand.secondary",
      color: "white",
      size: "lg",
      fontSize: "lg",
      fontWeights: "bold",
      lineHeights: "22",
      _hover: { bg: "brand.secondary", opacity: "0.60" },
      _active: { bg: "brand.secondary", opacity: "0.60" },
    },
    editorFooterIconBtn: {
      bg: "transparent",
      color: "white",
      fontSize: "xl",
      _hover: { bg: "rgba(200, 197, 197, 0.6)"},
      size: "sm",
    },
  },
};

export default buttonStyles;
