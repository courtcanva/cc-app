import { Box } from "@chakra-ui/react";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import Blueprints from "./Blueprints";
import Folder from "./Folder";
import { IconContext } from "react-icons";

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
        <IconContext.Provider value={{ style: { verticalAlign: "middle", marginLeft: "-8px" } }}>
          <RiArrowLeftSLine size={25} />
        </IconContext.Provider>
      </Box>
    </Box>
  );
};

export default SideBarContainer;
