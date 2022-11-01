import React from "react";
import { IoCubeSharp } from "react-icons/io5";
import { Icon, Flex, Text, useDisclosure } from "@chakra-ui/react";
import ThreeDimensionalContainer from "./ThreeDimensionalContainer";

interface Props {
  width: number;
  height: number;
}

const ThreeDimensionalToggle = ({ width, height }: Props) => {
  const { isOpen: isOpen3D, onOpen: onOpen3D, onClose: onClose3D } = useDisclosure();
  return (
    <>
      <Flex
        width="100px"
        height="40px"
        position="absolute"
        right="18px"
        top="38px"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        color="#344C5C"
        filter="drop-shadow(2px 2px 4px #344C5C)"
        onClick={onOpen3D}
        cursor="pointer"
      >
        <Icon as={IoCubeSharp} width={6} height={6} />
        <Text fontSize="12px">3D Preview</Text>
      </Flex>
      <ThreeDimensionalContainer
        isOpen={isOpen3D}
        onClose={onClose3D}
        width={width}
        height={height}
      />
    </>
  );
};

export default ThreeDimensionalToggle;
