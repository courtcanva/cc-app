import React, { useEffect } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import { useDispatch } from "react-redux";
import { usePaintBucket } from "@/store/reducer/buttonToggleSlice";
import { useGetCourtColorQuery } from "@/redux/api/courtColorAPi";
import { IColor } from "@/interfaces/color";
import { getColorList } from "@/store/reducer/colorListSlice";
import { useStoreSelector } from "@/store/hooks";

const ColorBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetCourtColorQuery(0);
  const { colorList } = useStoreSelector((state) => state.colorList);
  useEffect(() => {
    if (data === undefined) return;
    dispatch(getColorList(data));
  }, [data]);
  const handleChangeColor = (value: string): void => {
    dispatch(changeSelectedColor(value));
    dispatch(usePaintBucket(false));
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
      {colorList[0]?.colors.map((color: IColor) => (
        <Box
          as="button"
          key={color.value}
          bg={color.value}
          // data-testid={color}
          w="30px"
          h="30px"
          _hover={{ border: "2.5px solid #40B484" }}
          _focus={{ border: "2.5px solid #40B484" }}
          onClick={() => handleChangeColor(color.value)}
        />
      ))}
    </Flex>
  );
};

export default ColorBoard;
