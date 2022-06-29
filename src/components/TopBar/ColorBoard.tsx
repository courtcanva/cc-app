import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import mockPlateColors from "./colorList";
import { changeSelectedColor } from "@/store/reducer/courtColorSlice";
import { useDispatch } from "react-redux";
import ColorSvg from "@/assets/svg/TopBarSvg/color.svg";
import { useStoreSelector } from "@/store/hooks";

const ColorBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [fillColor, setFillColor] = useState<string>("#344c5c");
  const handleChangeColor = (color: string): void => {
    // const svgIcon = 
    // `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="20" height="20" viewBox="0 0 1000 1000" xml:space="preserve">
    //   <g transform="matrix(48.1412 0 0 47.9491 499.9998 391.1016)" id="610803">
    //     <path style="stroke:` + color + `; fill: ` + color + `; stroke-width: 1.4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-8.9991, -7.9793)" d="M 6.228 3.828 l 0.353 -0.353 l -0.353 -0.354 l -1.54 -1.54 a 0.413 0.413 0 0 1 0 -0.585 a 0.413 0.413 0 0 1 0.585 0 l 7.553 7.553 c 0.348 0.347 0.343 0.9 0.003 1.233 l -0.003 0.003 l -5.041 5.042 a 0.883 0.883 0 0 1 -0.618 0.257 a 0.883 0.883 0 0 1 -0.619 -0.257 L 1.507 9.785 l -0.003 -0.003 a 0.867 0.867 0 0 1 0.003 -1.233 l 4.72 -4.72 z M 2.422 8.814 l -0.853 0.853 H 12.764 l -0.853 -0.853 l -4.39 -4.391 l -0.354 -0.354 l -0.354 0.354 l -4.39 4.39 z m 12.995 2.496 c 0.15 0.184 0.329 0.414 0.508 0.667 c 0.22 0.313 0.432 0.65 0.588 0.974 c 0.16 0.333 0.237 0.606 0.237 0.8 c 0 0.732 -0.601 1.333 -1.334 1.333 a 1.339 1.339 0 0 1 -1.333 -1.333 c 0 -0.194 0.077 -0.467 0.237 -0.8 c 0.156 -0.324 0.368 -0.661 0.588 -0.974 c 0.18 -0.253 0.358 -0.483 0.508 -0.667 z" stroke-linecap="round"/>
    //   </g>
    //   <g transform="matrix(40.4762 0 0 32.5665 500.0001 873.2665)" id="194345">
    //     <path style="stroke: ` + color + `; fill: ` + color + `; stroke-width: 1.4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-11, -2.1665)" d="M 1.833 0.833 h 18.334 c 0.732 0 1.333 0.601 1.333 1.333 c 0 0.733 -0.601 1.334 -1.333 1.334 H 1.833 A 1.339 1.339 0 0 1 0.5 2.166 c 0 -0.732 0.601 -1.333 1.333 -1.333 z" stroke-linecap="round"/>
    //   </g>
    // </svg>`;
    // const iconUrl =`data:image/svg+xml;base64,` 
    //     + window.btoa(unescape(encodeURIComponent(svgIcon)))
    // document.body.style.cursor = `url(` + iconUrl + `) 24 24,auto`;
    setFillColor(color);
    dispatch(changeSelectedColor(color));
  };

  useEffect(() => {
    const svgIcon = 
    `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 1000 1000" xml:space="preserve">
      <g transform="matrix(48.1412 0 0 47.9491 499.9998 391.1016)" id="610803">
        <path style="stroke:` + fillColor + `; fill: ` + fillColor + `; stroke-width: 1.4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-8.9991, -7.9793)" d="M 6.228 3.828 l 0.353 -0.353 l -0.353 -0.354 l -1.54 -1.54 a 0.413 0.413 0 0 1 0 -0.585 a 0.413 0.413 0 0 1 0.585 0 l 7.553 7.553 c 0.348 0.347 0.343 0.9 0.003 1.233 l -0.003 0.003 l -5.041 5.042 a 0.883 0.883 0 0 1 -0.618 0.257 a 0.883 0.883 0 0 1 -0.619 -0.257 L 1.507 9.785 l -0.003 -0.003 a 0.867 0.867 0 0 1 0.003 -1.233 l 4.72 -4.72 z M 2.422 8.814 l -0.853 0.853 H 12.764 l -0.853 -0.853 l -4.39 -4.391 l -0.354 -0.354 l -0.354 0.354 l -4.39 4.39 z m 12.995 2.496 c 0.15 0.184 0.329 0.414 0.508 0.667 c 0.22 0.313 0.432 0.65 0.588 0.974 c 0.16 0.333 0.237 0.606 0.237 0.8 c 0 0.732 -0.601 1.333 -1.334 1.333 a 1.339 1.339 0 0 1 -1.333 -1.333 c 0 -0.194 0.077 -0.467 0.237 -0.8 c 0.156 -0.324 0.368 -0.661 0.588 -0.974 c 0.18 -0.253 0.358 -0.483 0.508 -0.667 z" stroke-linecap="round"/>
      </g>
      <g transform="matrix(40.4762 0 0 32.5665 500.0001 873.2665)" id="194345">
        <path style="stroke: ` + fillColor + `; fill: ` + fillColor + `; stroke-width: 1.4; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-11, -2.1665)" d="M 1.833 0.833 h 18.334 c 0.732 0 1.333 0.601 1.333 1.333 c 0 0.733 -0.601 1.334 -1.333 1.334 H 1.833 A 1.339 1.339 0 0 1 0.5 2.166 c 0 -0.732 0.601 -1.333 1.333 -1.333 z" stroke-linecap="round"/>
      </g>
    </svg>`;
    const iconUrl =`data:image/svg+xml;base64,` 
        + window.btoa(unescape(encodeURIComponent(svgIcon)))
    document.body.style.cursor = `url(` + iconUrl + `), auto`;
  }, [handleChangeColor]);

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
          _hover={{ border: "2.5px solid #40B484" }}
          _focus={{ border: "2.5px solid #40B484" }}
          onClick={() => handleChangeColor(color)}
        />
      ))}
    </Flex>
  );
};

export default ColorBoard;
