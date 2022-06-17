import { Box } from "@chakra-ui/react";
import React from "react";
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
