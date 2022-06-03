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
      _hover: { bg: "rgba(200, 197, 197, 0.6)" },
      size: "sm",
    },
     loginBtn: {
      bg: "background.third",
      color: "fontcolor.secondary",
      size: "lg",
      fontSize: "16px",
      fontWeights: "bold",
      lineHeights: "40",
      _hover: { bg: "brand.secondary"},
      _active: { bg: "brand.secondary"},
      _focus:{ boxShadow:""},
 },
  },
};

export default buttonStyles;
