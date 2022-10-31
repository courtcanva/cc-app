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
} from "@chakra-ui/react";
import ProFullCourt from "../ProFullCourt";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: need to add state to redux like ruler and drag
const ThreeDimensionalContainer = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width="1200px"></ModalContent>
        <Button onClick={onClose}>Close</Button>
      </Modal>
    </>
  );
};

export default ThreeDimensionalContainer;
