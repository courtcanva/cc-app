import React, { useState } from "react";
import { GrDown, GrUp } from "react-icons/gr";
import { IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { PriceBar } from "@/store/reducer/priceBarSlice";

type detail = {
  detail: PriceBar[];
};

const DropDownButton = ({ detail }: detail) => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  const scroll = "scroll";
  const hidden = "hidden";
  const noWrap = "nowrap";
  const normal = "normal";
  const clip = "clip";
  const ellipsis = "ellipsis";

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
        style={{
          width: "100%",
          overflowY: show ? scroll : hidden,
          userSelect: "none",
          whiteSpace: show ? normal : noWrap,
          textOverflow: show ? clip : ellipsis,
          textAlign: "center",
        }}
        data-testid="testShow"
      >
        {detail.map(
          (content: PriceBar) => `Color:${content.color},  Quantity:${content.quantity}  `
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
    </div>
  );
};

export default DropDownButton;
