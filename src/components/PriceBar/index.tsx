import { Box, Flex, Spacer, Collapse } from "@chakra-ui/react";
import { useStyleConfig } from "@chakra-ui/react";
import Down from "@/assets/svg/PriceBarSvg/down.svg";
import Up from "@/assets/svg/PriceBarSvg/up.svg";
import React from "react";
import CourtTemplate from "./CourtTemplate";
import TileColorBoard from "./TileColorBoard";

const PriceBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const drawerBtnStyles = useStyleConfig("drawerButtonStyles");

  const drawerButton = (
    <Box
      as="button"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
      sx={drawerBtnStyles}
      data-testid="drawer-button"
    >
      <Box pos="absolute" zIndex="1" top="50%" left="50%" transform="translate(-50%, -50%)">
        {isOpen ? <Down /> : <Up />}
      </Box>
    </Box>
  );

  return (
    <Box position="fixed" bottom="42px" right="0px" width="calc(100% - 98px)" zIndex="1600">
      {drawerButton}
      <Box backgroundColor="#fff">
        <Box boxShadow="0px -5px 10px -5px lightgrey" p="0">
          <Collapse in={isOpen} animateOpacity>
            <Flex>
              <CourtTemplate />
              <Spacer />
              <TileColorBoard />
            </Flex>
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
};

export default PriceBar;
