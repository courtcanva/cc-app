import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import TileColorBoard from "./TileColorBoard";
import BudgetBoard from "./BudgetBoard";

const PriceBar: React.FC = () => {
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");

  return (
    <Flex
      height="64px"
      backgroundColor="background.tertiary"
      position="fixed"
      bottom="42px"
      right="0px"
      width="calc(100% - 98px)"
      zIndex="1500"
    >
      <TileColorBoard setTotalPrice={setTotalPrice} />
      <BudgetBoard useTotalPrice={useTotalPrice} />
    </Flex>
  );
};

export default PriceBar;
