import { Box } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Blueprints from "./Blueprints";
interface Props {
  iconClickTitle: string;
  onHandleCloseClick: () => void;
}
const showContainerItem = (iconClickTitle: string) => {
  switch (iconClickTitle) {
    case "Blueprints":
      return <Blueprints />;
    default:
      return iconClickTitle;
  }
};

const SideBarContainer = (props: Props) => {
  return (
    <Box
      bg="background.secondary"
      width="280px"
      h="calc(100vh - 72px)"
      top="72px"
      left="96px"
      position="fixed"
      zIndex="2000"
      color="#fff"
    >
      {showContainerItem(props.iconClickTitle)}
      <Box
        as="button"
        onClick={props.onHandleCloseClick}
        position="absolute"
        top="calc(48% - 84px)"
        right="-14px"
        h="100px"
        w="14px"
        bg="background.secondary"
        clipPath="polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)"
        zIndex="-1"
      >
        <ChevronLeftIcon
          w={6}
          h={6}
          color="#fff"
          position="absolute"
          top="calc(50% - 16px)"
          right="-4px"
        />
      </Box>
    </Box>
  );
};

export default SideBarContainer;
