import React, { useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { Flex, IconButton, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { MotionStyle } from "framer-motion";
import { ICourtSize } from "@/interfaces/design";

interface detail {
  detail: ICourtSize;
}

const DropDownButton = ({ detail }: detail) => {
  const {
    name: courtName,
    length: length,
    width: width,
    sideBorderWidth: sideBorderWidth,
    // fencingLength: fencingLength,
    // fencingWidth: fencingWidth,
    // hoopsCount: hoopsCount,
  } = detail;
  {
    /* todo: add fencing and hoops in detail */
  }
  const lengthInMeter = (length + sideBorderWidth * 2) / 1000;
  const widthInMeter = (width + sideBorderWidth * 2) / 1000;

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const collapseStyle: MotionStyle = {
    width: "100%",
    overflowY: show ? "scroll" : "hidden",
    userSelect: "none",
    whiteSpace: show ? "normal" : "nowrap",
    textOverflow: show ? "clip" : "ellipsis",
    textAlign: "left",
    paddingLeft: "10px",
  };

  return (
    <Flex w="100%" flexDirection="row" overflow="auto">
      <Collapse startingHeight={25} in={show} style={collapseStyle} data-testid="testShow">
        <UnorderedList>
          <ListItem>
            <Text size="xs">
              Court Material
              <br />
              Tile: {lengthInMeter}*{widthInMeter}m,{courtName}
              <br />
              Hoops
              {/* todo: Hoops x {hoopsCount} */}
              <br />
              Fencing
              {/* todo: {fencingLength}*{fencingWidth}m */}
            </Text>
          </ListItem>
          <ListItem>
            <Text size="xs">Shipping cost</Text>
          </ListItem>
          <ListItem>
            <Text size="xs">Installation fee</Text>
          </ListItem>
        </UnorderedList>
      </Collapse>
      <IconButton
        icon={show ? <GrUp /> : <GrDown />}
        colorScheme="white"
        size="sm"
        onClick={handleToggle}
        marginTop="auto"
        aria-label="dropDownBtn"
        _focus={{ background: "white" }}
        data-testid="collapseBtn"
      />
    </Flex>
  );
};

export default DropDownButton;
