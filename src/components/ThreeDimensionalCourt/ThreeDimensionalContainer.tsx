import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  Flex,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { switch3D } from "@/store/reducer/buttonToggleSlice";

import Sidebar from "@/components/ThreeDimensionalCourt/Sidebar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  height: number;
  content: ReactNode;
}

const ThreeDimensionalContainer = ({ isOpen, onClose, width, height, content }: Props) => {
  console.log(isOpen);
  const dispatch = useDispatch();
  const [rotateHorizontalDeg, setRotateHorizontalDeg] = useState<number>(0);
  const rotateVerticalDeg = 40;
  const handleClose3D = () => {
    setRotateHorizontalDeg(0);
    dispatch(switch3D(false));
    onClose();
  };
  return (
    <>
      <style jsx>{`
        .scene_3d {
          perspective: 2000px;
          transform-style: preserve-3d;
          max-height: 100vh;
          max-width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .court_plane {
          height: ${height}px;
          width: ${width}px;
          perspective: 10000px;
          transform-style: preserve-3d;
          transform: rotateX(calc(${rotateVerticalDeg} * 1.6deg))
            rotateZ(calc(${rotateHorizontalDeg} * 1deg)) scale(0.6);
        }
      `}</style>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={handleClose3D} isCentered size="4xl">
          <ModalOverlay />
          <ModalContent position="relative" height="80%">
            <ModalCloseButton zIndex={10} />
            <Flex
              flexDirection="column"
              alignItems="center"
              position="relative"
              maxHeight="100%"
              maxWidth="100%"
            >
              <div className="scene_3d">
                <div className="court_plane">{content}</div>
              </div>

              <ModalFooter
                position="absolute"
                bottom="1rem"
                display="Flex"
                justifyContent="center"
                alignItems="center"
                data-testid="sidebar"
              >
                <Sidebar setRotateDeg={setRotateHorizontalDeg} rotateDeg={rotateHorizontalDeg} />
              </ModalFooter>
            </Flex>
          </ModalContent>
        </Modal>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export default ThreeDimensionalContainer;
