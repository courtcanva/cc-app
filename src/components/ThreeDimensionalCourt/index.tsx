import React, { ReactNode } from "react";
import { IoCubeSharp } from "react-icons/io5";
import { Icon, Flex, Text, useDisclosure } from "@chakra-ui/react";
import ThreeDimensionalContainer from "./ThreeDimensionalContainer";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { switch3D } from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";

interface Props {
  width: number;
  height: number;
  children: ReactNode;
}

const ThreeDimensionalToggle = ({ width, height, children }: Props) => {
  const dispatch = useDispatch();
  const { isSwitch3D } = useStoreSelector((state) => state.buttonToggle);
  const { onClose } = useDisclosure();
  const handleOpenSwitch3D = async () => {
    await dispatch(resetAll());
    dispatch(switch3D(true));
    dispatch(changeSelectedColor("none"));
    document.body.style.cursor = "auto";
  };
  const handleClose3D = () => {
    onClose();
    dispatch(switch3D(false));
    document.body.style.cursor = "auto";
  };
  return (
    <>
      <Flex
        width="100px"
        height="40px"
        position="absolute"
        right="218px"
        top="38px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="brand.primary"
        filter="drop-shadow(2px 2px 4px #7088B1)"
        onClick={handleOpenSwitch3D}
        cursor="pointer"
        zIndex={10}
      >
        <Icon as={IoCubeSharp} width={6} height={6} />
        <Text fontSize="12px">3D Preview</Text>
      </Flex>
      <ThreeDimensionalContainer
        isOpen={isSwitch3D}
        onClose={handleClose3D}
        width={width}
        height={height}
        content={children}
      />
    </>
  );
};

export default ThreeDimensionalToggle;
