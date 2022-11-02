import React from "react";
import {
  Modal,
  ModalContent,
  Flex,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import Image from "next/image";
import { useState } from "react";

import { FcRemoveImage } from "react-icons/fc";
import Sidebar from "@/components/ThreeDimensionalCourt/Sidebar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  height: number;
}

const ThreeDimensionalContainer = ({ isOpen, onClose, width, height }: Props) => {
  const { courtDataUrl } = useStoreSelector((state) => state.canvasControl);
  const [rotateHorizontalDeg, setRotateHorizontalDeg] = useState<number>(0);
  const rotateVerticalDeg = 40;
  return (
    <>
      <style jsx>{`
        .scene_3d {
          perspective: 2000px;
          transform-style: preserve-3d;
          width: 90%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .court_plane {
          height: ${height}px;
          width: ${width}px;
          perspective: 10000px;
          transform-style: preserve-3d;
          transform-origin: 50% 50%;
          transform: rotateX(calc(${rotateVerticalDeg} * 1.8deg))
            rotateZ(calc(${rotateHorizontalDeg} * 1deg)) scale(0.9);
        }
      `}</style>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="5xl">
        <ModalOverlay />
        <ModalContent position="relative" height="80%">
          <ModalCloseButton />
          <Flex flexDirection="column" alignItems="center" gap="2rem">
            <div className="scene_3d">
              <div className="court_plane">
                {courtDataUrl ? (
                  <Image src={courtDataUrl} objectFit="contain" width={width} height={height} />
                ) : (
                  <FcRemoveImage size={42} />
                )}
              </div>
            </div>

            <ModalFooter
              display="Flex"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
              marginTop="10px"
            >
              <Sidebar setRotateDeg={setRotateHorizontalDeg} rotateDeg={rotateHorizontalDeg} />
            </ModalFooter>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ThreeDimensionalContainer;
