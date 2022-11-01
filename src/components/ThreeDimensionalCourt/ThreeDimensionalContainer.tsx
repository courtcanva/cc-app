import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  Text,
  Icon,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: need to add state to redux like ruler and drag
const ThreeDimensionalContainer = ({ isOpen, onClose }: Props) => {
  const ProFullCourt = dynamic(() => import("@/components/ProFullCourt"), { ssr: false });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent width="100%">
          <ModalHeader>3D Preview Court</ModalHeader>
          <ModalCloseButton />
          <ModalBody height="2000px">
            <ProFullCourt />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThreeDimensionalContainer;
