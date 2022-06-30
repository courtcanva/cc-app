import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import mockPlateColors from "./colorList";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import { useDispatch } from "react-redux";
import { useStoreSelector } from "@/store/hooks";
import svgIcon from "../../utils/svgIcon";

const ColorBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [fillColor, setFillColor] = useState<string>("#344c5c");
  const { selectedColor } = useStoreSelector((state) => state.courtColor);
  const handleChangeColor = (paintColor: string): void => {
    setFillColor(paintColor);
    dispatch(changeSelectedColor(paintColor));
    const iconUrl = // import svg string from utils and convert it to cur type (svg cannot be used as cursor directly)
      `data:image/svg+xml;base64,` + window.btoa(unescape(encodeURIComponent(svgIcon(paintColor))));
    document.body.style.cursor = `url(` + iconUrl + `) 24 24, auto`;
  };
  if (typeof window !== "undefined" && selectedColor === "none") {
    // check whether it is on browser, otherwise line 21 may cause error if it is on server.
    document.body.style.cursor = "auto";
  }

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
