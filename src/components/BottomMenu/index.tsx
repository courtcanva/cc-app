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
import React from "react";
import CourtTemplate from "./CourtTemplate";
import TireColorBoard from "./TireColorBoard";

const BottomMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const styles = useStyleConfig("DrawerButton", { isOpen });

  return (
    <Box position="fixed" bottom="0px" width="100vw" marginBottom="34px">
      {!isOpen && <Box onClick={onOpen} sx={styles} />}
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
            marginBottom: "34px",
          }}
        >
          <Box onClick={onClose} sx={styles} />
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

export default BottomMenu;
