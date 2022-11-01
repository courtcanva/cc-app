import React, { Children } from "react";
import { ReactNode, useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";

interface Props {
  children: ReactNode;
  stageWidth: number;
  stageHeight: number;
}

const ThreeCourt = ({ children, stageWidth, stageHeight }: Props) => {
  const { isSwitch3D } = useStoreSelector((state) => state.buttonToggle);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isSwitch3D ? (
        <Modal closeOnOverlayClick={false} isOpen={isSwitch3D} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}></ModalBody>
            {children}
            <ModalFooter>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ThreeCourt;
