import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import mockPlateColors from "./colorList";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import { useDispatch } from "react-redux";
import { usePaintBucket } from "@/store/reducer/paintBucketSlice";
import { useGetCourtColorQuery } from "@/redux/api/courtColorAPi";

const ColorBoard: React.FC = () => {
  const dispatch = useDispatch();
  const handleChangeColor = (paintColor: string): void => {
    dispatch(changeSelectedColor(paintColor));
    dispatch(usePaintBucket(false));
  };

  const { data } = useGetCourtColorQuery(0);

  console.log(data);
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
      {mockPlateColors.map((paintColor) => (
        <Box
          as="button"
          key={paintColor}
          bg={paintColor}
          data-testid={paintColor}
          w="30px"
          h="30px"
          _hover={{ border: "2.5px solid #40B484" }}
          _focus={{ border: "2.5px solid #40B484" }}
          onClick={() => handleChangeColor(paintColor)}
        />
      ))}
    </Flex>
  );
};

export default ColorBoard;
