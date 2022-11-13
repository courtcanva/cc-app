import React, { useState } from "react";
import { Flex, ListItem, UnorderedList, Text, IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { MotionStyle } from "framer-motion";
import { ICourtSize } from "@/interfaces/design";
import { GrDown, GrUp } from "react-icons/gr";

interface Props {
  detail: ICourtSize;
}

const DropDownButton: React.FC<Props> = ({ detail }) => {
  const { name: courtName, length, width, sideBorderWidth } = detail;

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  {
    /* todo: add fencing and hoops in detail */
  }
  const lengthInMeter = (length + sideBorderWidth * 2) / 1000;
  const widthInMeter = (width + sideBorderWidth * 2) / 1000;
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
    <Flex width="100%" flexDirection="row" overflow="auto" marginTop="1.5vw">
      <Collapse startingHeight="1.5vw" in={show} style={collapseStyle} data-testid="testShow">
        <UnorderedList>
          <ListItem marginLeft="3px">
            <Text size="xs">
              Court Material
              <UnorderedList>
                <ListItem>
                  Tiles ({lengthInMeter}m*{widthInMeter}m,{courtName})
                </ListItem>
              </UnorderedList>
            </Text>
          </ListItem>

          <ListItem marginLeft="3px">
            <Text size="xs">Shipping</Text>
          </ListItem>
          <ListItem marginLeft="3px">
            <Text size="xs">
              Installation fee
              <UnorderedList>
                <ListItem>Court tile paving</ListItem>
                <ListItem>Court painting</ListItem>
              </UnorderedList>
            </Text>
          </ListItem>
        </UnorderedList>
      </Collapse>
      <IconButton
        icon={show ? <GrUp /> : <GrDown />}
        colorScheme="white"
        size="1vw"
        onClick={handleToggle}
        aria-label="dropDownBtn"
        _focus={{ background: "white" }}
        data-testid="collapseBtn"
      />
    </Flex>
  );
};

export default DropDownButton;
