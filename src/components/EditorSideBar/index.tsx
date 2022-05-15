import EditorSideBarItem from "./EditorSideBarItem";
import { Box, Flex } from "@chakra-ui/react";
import { BlueprintsSvg, ElementsSvg, EstimatorSvg, PreviewSvg } from "./EditorSideBarIcon";

const EditorSideBar = () => {
  const sideBarContent = [
    {
      sideBarItemText: "Blueprints",
      iconSvg: BlueprintsSvg,
    },
    {
      sideBarItemText: "Elements",
      iconSvg: ElementsSvg,
    },
    {
      sideBarItemText: "Estimator",
      iconSvg: EstimatorSvg,
    },
    {
      sideBarItemText: "Preview",
      iconSvg: PreviewSvg,
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
            key={item.sideBarItemText}
            item_text={item.sideBarItemText}
            icon_svg={item.iconSvg}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default EditorSideBar;
