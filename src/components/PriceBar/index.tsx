import { Box, Flex, Spacer, Collapse } from "@chakra-ui/react";
import { useStyleConfig } from "@chakra-ui/react";
import Down from "@/assets/svg/PriceBarSvg/down.svg";
import Up from "@/assets/svg/PriceBarSvg/up.svg";
import React from "react";
import CourtTemplate from "./CourtTemplate";
import TileColorBoard from "./TileColorBoard";

const PriceBar: React.FC = () => {
  return (
    <Box
      boxShadow="0px -5px 10px -5px lightgrey"
      backgroundColor="#fff"
      position="fixed"
      bottom="42px"
      right="0px"
      width="calc(100% - 98px)"
      zIndex="1600"
    >
      <TileColorBoard />
    </Box>
  );
};

export default PriceBar;
