import { Box, Drawer, DrawerBody, DrawerContent, Flex, Spacer } from "@chakra-ui/react";
import { useStyleConfig } from "@chakra-ui/react";
import Down from "@/assets/svg/PriceBarSvg/down.svg";
import Up from "@/assets/svg/PriceBarSvg/up.svg";
import React from "react";
import CourtTemplate from "./CourtTemplate";
import TileColorBoard from "./TileColorBoard";

const PriceBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const drawerBtnStyles = useStyleConfig("DrawerButton", { isOpen });

  const drawerController = () => setIsOpen(!isOpen);

  const drawerButton = (
    controller: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>
  ) => {
    return (
      <Box onClick={controller} sx={drawerBtnStyles} as="button" data-testid="drawer-button">
        <Box pos="absolute" zIndex="1" top="50%" left="50%" transform="translate(-50%, -50%)">
          {isOpen ? <Down /> : <Up />}
        </Box>
      </Box>
    );
  };

  return (
    <Box position="fixed" bottom="0px" width="100vw" marginBottom="38px" zIndex="1600">
      {!isOpen && drawerButton(drawerController)}
      <Drawer
        placement="bottom"
        onClose={drawerController}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        variant="alwaysOpen"
      >
        <DrawerContent
          backgroundColor="#fff"
          sx={{
            width: "calc(100% - 98px)",
            marginLeft: "98px",
            marginBottom: "42px",
          }}
        >
          {drawerButton(drawerController)}
          <DrawerBody boxShadow="0px -5px 10px -5px lightgrey" p="0">
            <Flex>
              <CourtTemplate />
              <Spacer />
              <TileColorBoard />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PriceBar;
