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
      <Collapse startingHeight={25} in={show} style={{ overflow: "scroll" }}>
        {content}
      </Collapse>
      <IconButton
        icon={show ? <GrUp /> : <GrDown />}
        colorScheme="white"
        size="sm"
        onClick={handleToggle}
        mt="auto"
        aria-label={"dropDownBtn"}
      />
    </div>
  );
};

export default DropDownButton;
