import { useStoreSelector } from "@/store/hooks";
import React from "react";
import OrderContainer from "./OrderContainer";

const OrderGeneration = () => {
  const { isOrderGenerationOpen } = useStoreSelector((state) => state.buttonToggle);

  return <>{isOrderGenerationOpen && <OrderContainer />}</>;
};

export default OrderGeneration;
