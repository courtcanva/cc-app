import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useStyleConfig } from "@chakra-ui/react";
import Down from "@/assets/svg/PriceBarSvg/down.svg";
import Up from "@/assets/svg/PriceBarSvg/up.svg";
import React from "react";
import CourtTemplate from "./CourtTemplate";
import TireColorBoard from "./TireColorBoard";

const PriceBar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const styles = useStyleConfig("DrawerButton", { isOpen });

  const drawerButton = (onOffFunc: React.MouseEventHandler<HTMLDivElement | HTMLButtonElement>) => {
    return (
      <Box onClick={onOffFunc} sx={styles} as="button">
        <Box pos="absolute" zIndex="1" top="50%" left="50%" transform="translate(-50%, -50%)">
          {isOpen ? <Down /> : <Up />}
        </Box>
      </Box>
    );
  };

  return (
    <Box position="fixed" bottom="0px" width="100vw" marginBottom="40px">
      {!isOpen && drawerButton(onOpen)}
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        variant="alwaysOpen"
      >
        <DrawerContent
          backgroundColor="#fff"
          sx={{
            width: "calc(100% - 98px)",
            marginLeft: "98px",
            marginBottom: "40px",
          }}
        >
          {drawerButton(onClose)}
          <DrawerBody boxShadow="0px -5px 10px -5px lightgrey" p="0">
            <Flex>
              <CourtTemplate />
              <Spacer />
              <TireColorBoard />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default PriceBar;
