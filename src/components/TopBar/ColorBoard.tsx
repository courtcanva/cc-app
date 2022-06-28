import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import mockPlateColors from "./colorList";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import { useDispatch } from "react-redux";

const ColorBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [fillColor, setFillColor] = useState<string>("");
  const handleChangeColor = (color: string): void => {
    setFillColor(color);
    dispatch(changeSelectedColor(color));
  };
  return (
    <Flex
      wrap="wrap"
      w="275px"
      h="150px"
      columnGap="18px"
      mt="9px"
      ml="2px"
      data-testid="ColorBoard"
    >
      {mockPlateColors.map((color) => (
        <Box
          as="button"
          key={color}
          bg={color}
          data-testid={color}
          w="30px"
          h="30px"
          cursor="pointer"
          _hover={{ border: "2px solid #40B484" }}
          _active={{ border: "3px solid #40B484" }}
          onClick={() => handleChangeColor(color)}
        />
      ))}
    </Flex>
  );
};

export default ColorBoard;
