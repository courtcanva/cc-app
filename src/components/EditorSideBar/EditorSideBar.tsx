import EditorSideBarItem from "./EditorSideBarItem";
import { Box, Flex } from "@chakra-ui/react";

const EditorSideBar = () => {
  const sideBarContent = [
    {
      id: "a",
      sideBarItemViewBox: "0 0 28 24",
      sideBarItemText: "Blueprints",
      sideBarIconWidth: "28px",
      sideBarIconHeight: "24px",
      sideBarIconSrc: "./svg/blueprints.svg",
      iconColor: "background.primary",
      textColor: "fontcolor.primary",
    },
    {
      id: "b",
      sideBarItemViewBox: "0 0 28 28",
      sideBarItemText: "Elements",
      sideBarIconWidth: "28px",
      sideBarIconHeight: "28px",
      sideBarIconSrc: "./svg/elements.svg",
      iconColor: "fontcolor.secondary",
      textColor: "fontcolor.secondary",
    },
    {
      id: "c",
      sideBarItemViewBox: "0 0 16 24",
      sideBarItemText: "Estimator",
      sideBarIconWidth: "16px",
      sideBarIconHeight: "24px",
      sideBarIconSrc: "./svg//estimator.svg",
      iconColor: "fontcolor.secondary",
      textColor: "fontcolor.secondary",
    },
    {
      id: "d",
      sideBarItemViewBox: "0 0 28 20",
      sideBarItemText: "Preview",
      sideBarIconWidth: "28px",
      sideBarIconHeight: "20px",
      sideBarIconSrc: "./svg//preview.svg",
      iconColor: "fontcolor.secondary",
      textColor: "fontcolor.secondary",
    },
  ];
  return (
    <Box
      bg="background.primary"
      w="98px"
      h="calc(100vh - 50px)"
      position="fixed"
      top="100px"
      left="0"
    >
      <Flex align="center" justify="center" flexDirection="column" maxW="98px">
        {sideBarContent.map((item) => (
          <EditorSideBarItem
            key={item.id}
            item_text={item.sideBarItemText}
            icon_width={item.sideBarIconWidth}
            icon_height={item.sideBarIconHeight}
            icon_src={item.sideBarIconSrc}
            icon_color={item.iconColor}
            text_color={item.textColor}
          ></EditorSideBarItem>
        ))}
      </Flex>
    </Box>
  );
};

export default EditorSideBar;
