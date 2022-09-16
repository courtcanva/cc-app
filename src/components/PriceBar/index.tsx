import { Box } from "@chakra-ui/react";
import React from "react";
import TileColorBoard from "./TileColorBoard";

const PriceBar: React.FC = () => {
  return (
    <Box
      backgroundColor="background.tertiary"
      position="fixed"
      bottom="42px"
      right="0px"
      width="calc(100% - 98px)"
      zIndex="1500"
    >
      <TileColorBoard />
    </Box>
  );
};

export default PriceBar;
