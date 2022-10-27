import { useStoreSelector } from "@/store/hooks";
import React from "react";
import OrderContainer from "./OrderContainer";
import { userData } from "@/store/reducer/userSlice";

const OrderGeneration = () => {
  const { isOrderGenerationOpen } = useStoreSelector((state) => state.buttonToggle);
  const currentUserId = useStoreSelector(userData).userId;

  return <>{isOrderGenerationOpen && currentUserId && <OrderContainer />}</>;
};

export default OrderGeneration;
