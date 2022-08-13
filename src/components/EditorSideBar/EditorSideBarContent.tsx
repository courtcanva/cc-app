import { Box } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Blueprints from "./Blueprints";
import Folder from "./Folder";
interface Props {
  iconClickTitle: string;
  onHandleCloseClick: () => void;
}
const showContainerItem = (iconClickTitle: string) => {
  switch (iconClickTitle) {
    case "Blueprints":
      return <Blueprints />;
    case "Folder":
      return <Folder />;
    default:
      return iconClickTitle;
  }
};

const SideBarContainer = (props: Props) => {
  return (
    <Box
      background="background.secondaryLight"
      width="280px"
      height="calc(100vh - 72px)"
      top="72px"
      left="96px"
      position="fixed"
      zIndex="2000"
      color="fontcolor.primary"
    >
      {showContainerItem(props.iconClickTitle)}
      <Box
        as="button"
        onClick={props.onHandleCloseClick}
        position="absolute"
        top="calc(48% - 84px)"
        right="-14px"
        height="100px"
        width="14px"
        background="background.secondaryLight"
        clipPath="polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)"
        zIndex="-1"
      >
        <ChevronLeftIcon
          width={6}
          height={6}
          color="fontcolor.primary"
          position="absolute"
          top="calc(50% - 16px)"
          right="-4px"
        />
      </Box>
    </Box>
  );
};

export default SideBarContainer;
