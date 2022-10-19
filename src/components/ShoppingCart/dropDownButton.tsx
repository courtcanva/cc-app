import React, { useState, useEffect } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { Flex, Box, IconButton, ListItem, UnorderedList, Text } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { MotionStyle } from "framer-motion";
import { ICourtSize } from "@/interfaces/design";

interface Detail {
  detail: ICourtSize;
}

const DropDownButton = ({ detail }: Detail) => {
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
    lineHeight: "160%",
    alignItems: "center",
    paddingLeft: "2px",
  };

  return (
    <Flex w="100%" flexDirection="row" overflow="auto">
      <Collapse startingHeight={20} in={show} style={collapseStyle} data-testid="testShow">
        <UnorderedList>
          <ListItem>
            <Text size="xs">
              Court Material
              <UnorderedList>
                <ListItem>
                  Tile: ({lengthInMeter}m*{widthInMeter}m,{courtName})
                </ListItem>
                <ListItem style={{ listStyle: "none" }}>
                  Hoops (fixed height)
                  {/* todo: Hoops x {hoopsCount} */}
                </ListItem>
                <ListItem style={{ listStyle: "none" }}>
                  Fencing (2m height)
                  {/* todo: {fencingLength}*{fencingWidth}m */}
                </ListItem>
              </UnorderedList>
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
