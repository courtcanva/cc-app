import React, { useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { PriceBar } from "@/store/reducer/priceBarSlice";
import { MotionStyle } from "framer-motion";

type detail = {
  detail: PriceBar[];
};

const DropDownButton = ({ detail }: detail) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const collapseStyle: MotionStyle = {
    width: "100%",
    overflowY: show ? "scroll" : "hidden",
    userSelect: "none",
    whiteSpace: show ? "normal" : "nowrap",
    textOverflow: show ? "clip" : "ellipsis",
    textAlign: "center",
  };

  return (
    <Flex w="100%" flexDirection="row" overflow="auto">
      <Collapse startingHeight={25} in={show} style={collapseStyle} data-testid="testShow">
        {detail.map(
          (content: PriceBar) => `Color:${content.color},  Quantity:${content.quantity},  `
        )}
      </Collapse>
      <IconButton
        icon={show ? <GrUp /> : <GrDown />}
        colorScheme="white"
        size="sm"
        onClick={handleToggle}
        mt="auto"
        aria-label="dropDownBtn"
        _focus={{ bg: "white" }}
        data-testid="collapseBtn"
      />
    </Flex>
  );
};

export default DropDownButton;
