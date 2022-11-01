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
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import Image from "next/image";

import { FcRemoveImage } from "react-icons/fc";
import Sidebar from "@/components/ThreeDimensionalCourt/Sidebar";
import useCourt from "@/hooks/useCourt";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// NOTE: need to add state to redux like ruler and drag
const ThreeDimensionalContainer = ({ isOpen, onClose }: Props) => {
  const { courtDataUrl } = useStoreSelector((state) => state.canvasControl);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="6xl">
        <ModalOverlay />
        <ModalContent position="relative" height="80%">
          <ModalHeader>3D Preview Court</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {courtDataUrl ? (
              <Box width="full" height="100%" position="relative">
                <Image src={courtDataUrl} layout="fill" objectFit="contain" />
              </Box>
            ) : (
              <FcRemoveImage size={42} />
            )}
          </ModalBody>
          <ModalFooter display="Flex" justifyContent="center" alignItems="center" gap="1rem">
            <Badge>Sidebar</Badge>
            <Sidebar />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThreeDimensionalContainer;
