const priceBarDrawer = {
  variants: {
    alwaysOpen: {
      parts: ["dialog, dialogContainer"],
      dialog: {
        pointerEvents: "auto",
      },
      dialogContainer: {
        pointerEvents: "none",
      },
    },
  },
};

interface DrawerButtonProps {
  isOpen: boolean;
}

export const DrawerButton = {
  baseStyle: ({ isOpen }: DrawerButtonProps) => ({
    position: "absolute",
    top: "-30px",
    left: isOpen ? "calc(48% - 49px)" : "48%",
    rounded: "none",
    backgroundColor: "transparent",
    color: "black",
    height: "30px",
    width: "100px",
    cursor: "pointer",
    _after: {
      content: isOpen ? "'˅'" : "'˄'",
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

export default priceBarDrawer;
