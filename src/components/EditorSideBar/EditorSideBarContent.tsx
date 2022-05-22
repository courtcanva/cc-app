import { Box } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface Props {
  iconClickTitle: string;
  onHandleCloseClick: () => void;
}
const SideBarContainer = (props: Props) => {
  return (
    <Box
      bg="background.secondary"
      w="356px"
      h="calc(100vh - 72px)"
      top="72px"
      left="96px"
      position="fixed"
      zIndex="2000"
      color="#fff"
      p={6}
    >
      {props.iconClickTitle}
      <Box
        as="button"
        onClick={props.onHandleCloseClick}
        position="absolute"
        top="calc(48% - 84px)"
        right="-26px"
        h="168px"
        w="56px"
        bg="background.secondary"
        clipPath="polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)"
        z-index="1"
      >
        <ChevronLeftIcon
          w={8}
          h={8}
          color="#fff"
          position="absolute"
          top="calc(50% - 16px)"
          right="0px"
        />
      </Box>
    </Box>
  );
};

export default SideBarContainer;
