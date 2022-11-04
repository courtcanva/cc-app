import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  Flex,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { switch3D } from "@/store/reducer/buttonToggleSlice";

import Sidebar from "@/components/ThreeDimensionalCourt/Sidebar";
import { useMediaQuery } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  height: number;
  content: ReactNode;
}

const ThreeDimensionalContainer = ({ isOpen, onClose, width, height, content }: Props) => {
  const dispatch = useDispatch();
  const [rotateHorizontalDeg, setRotateHorizontalDeg] = useState<number>(0);
  const rotateVerticalDeg = 40;
  const handleClose3D = () => {
    setRotateHorizontalDeg(0);
    dispatch(switch3D(false));
    onClose();
  };
  const [isSmallerThan1200, isSmallerThan768] = useMediaQuery(
    "(max-width: 1200px),(max-width: 768px)"
  );

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
        <Box>
          <Modal
            isOpen={isOpen}
            onClose={handleClose3D}
            isCentered
            size={isSmallerThan768 ? "sm" : isSmallerThan1200 ? "4xl" : "6xl"}
          >
            <ModalOverlay />
            <ModalContent position="relative" height="80%">
              <ModalCloseButton zIndex={10} />
              <Flex
                flexDirection="column"
                alignItems="center"
                position="relative"
                maxHeight="100%"
                maxWidth="100%"
                justifyContent="center"
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
        </Box>
      ) : (
        <>{content}</>
      )}
    </>
  );
};

export default ThreeDimensionalContainer;
