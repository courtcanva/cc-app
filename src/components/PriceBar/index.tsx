import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import TileColorBoard from "./TileColorBoard";
import BudgetBoard from "./BudgetBoard";
import { RIGHT_BAR_WIDTH } from "@/constants/designPage";

const PriceBar: React.FC = () => {
  const [useTotalPrice, setTotalPrice] = useState<string>("0.00");

  return (
    <Flex
      height="64px"
      backgroundColor="background.tertiary"
      position="fixed"
      bottom="42px"
      left="98px"
      width={`calc(100vw - 98px - ${RIGHT_BAR_WIDTH})`}
      zIndex="1500"
    >
      <TileColorBoard setTotalPrice={setTotalPrice} />
      <BudgetBoard useTotalPrice={useTotalPrice} />
    </Flex>
  );
};

export default PriceBar;
