import React, { useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { Box, IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";

type quotationDetail = {
  content: string;
};
const DropDownButton = ({ content }: quotationDetail) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const scroll = "scroll";
  const hidden = "hidden";
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        overflow: "auto",
      }}
    >
      <Collapse
        startingHeight={25}
        in={show}
        style={{ overflowY: show ? scroll : hidden, userSelect: "none" }}
        data-testid="testShow"
      >
        {content}
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
    </div>
  );
};

export default DropDownButton;
