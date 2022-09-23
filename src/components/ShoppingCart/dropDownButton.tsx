import React, { useEffect, useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { Box, IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";

type quotationDetail = {
  content: string;
};
const DropDownButton = ({ content }: quotationDetail) => {
  const [show, setShow] = useState(false);

  const handleToggle = () =>  setShow(!show)

useEffect(() => {
  !show && topFunction()
}, [show])

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


  const scroll = "scroll";
  const hidden = "hidden";
  const noWrap ="nowrap"
  const normal = "normal"
  const clip = "clip"
  const ellipsis = "ellipsis"

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
        style={{ overflowY: show ? scroll : hidden, userSelect: "none", whiteSpace:show?normal:noWrap, textOverflow:show?clip:ellipsis}}
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
