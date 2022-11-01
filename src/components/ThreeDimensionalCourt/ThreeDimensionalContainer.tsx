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
  Badge,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  ModalHeader,
  CloseButton,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import Image from "next/image";

import { FcRemoveImage } from "react-icons/fc";
import Sidebar from "@/components/ThreeDimensionalCourt/Sidebar";
import useCourt from "@/hooks/useCourt";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  height: number;
}

// NOTE: need to add state to redux like ruler and drag
const ThreeDimensionalContainer = ({ isOpen, onClose, width, height }: Props) => {
  const { courtDataUrl } = useStoreSelector((state) => state.canvasControl);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
        <ModalOverlay />
        <ModalContent position="relative" height="80%">
          <ModalCloseButton />
          <Flex flexDirection="column" alignItems="center" gap="2rem">
            <ModalBody>
              {courtDataUrl ? (
                <Image
                  src={courtDataUrl}
                  objectFit="cover"
                  width={width * 0.8}
                  height={height * 0.8}
                />
              ) : (
                <FcRemoveImage size={42} />
              )}
            </ModalBody>
            <ModalFooter
              display="Flex"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
              marginTop="10px"
            >
              {/* <Badge>Sidebar</Badge> */}
              <Sidebar />
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThreeDimensionalContainer;
