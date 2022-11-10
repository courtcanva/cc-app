import React from "react";
import { useStoreSelector } from "@/store/hooks";
import { userData } from "@/store/reducer/userSlice";
import MyAccountContainer from "./MyAccountContainer";

const MyAccount = () => {
  const isMyAccountOpen = useStoreSelector((state) => state.buttonToggle.isMyAccountOpen);
  const currentUserId = useStoreSelector(userData).userId;
  return <>{isMyAccountOpen && currentUserId && <MyAccountContainer />}</>;
};

export default MyAccount;
