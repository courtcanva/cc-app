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

  return (
    <>
      <style>{`
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
            rotateZ(calc(${rotateHorizontalDeg} * 1deg)) scale(0.8);
        }
      `}</style>
      {isOpen ? (
        <Box>
          <Modal isOpen={isOpen} onClose={handleClose3D} isCentered size="6xl">
            <ModalOverlay />
            <ModalContent
              position="relative"
              height="82%"
              maxWidth={{ base: "98%", md: "95%", lg: "90%" }}
            >
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

                <Box
                  position="fixed"
                  bottom="15%"
                  display="Flex"
                  justifyContent="center"
                  alignItems="center"
                  data-testid="sidebar"
                >
                  <Sidebar setRotateDeg={setRotateHorizontalDeg} rotateDeg={rotateHorizontalDeg} />
                </Box>
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
