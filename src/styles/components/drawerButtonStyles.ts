interface DrawerButtonProps {
  isOpen: boolean;
}

const drawerButtonStyles = {
  baseStyle: ({ isOpen }: DrawerButtonProps) => ({
    position: "absolute",
    top: "-28px",
    left: "50%",
    transform: "translateX(-50%)",
    rounded: "none",
    backgroundColor: "transparent",
    color: "black",
    height: "30px",
    width: "100px",
    cursor: "pointer",
    _after: {
      content: "''",
      paddingTop: "4px",
      textAlign: "center",
      position: "absolute",
      top: "0; right: 0; bottom: 0; left: 0",
      transform: "perspective(40px) rotateX(10deg)",
      transformOrigin: "bottom",
      background: "#fff",
      boxShadow: "0px -6px 10px lightgrey",
    },
  }),
};

export default drawerButtonStyles;
