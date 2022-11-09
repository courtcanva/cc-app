import BackgroundContainer from "../BackgroundContainer";
import { IOrder } from "../../interfaces/order";
import { userData } from "@/store/reducer/userSlice";
import { useStoreSelector } from "@/store/hooks";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const MyOrder = () => {
  const isMyOrderOpen = useStoreSelector((state) => state.buttonToggle.isMyOrderOpen);
  const currentUserId = useStoreSelector(userData).userId;
  console.log("asdf");
  const { data } = useGetOrdersQuery(currentUserId ? currentUserId : skipToken);
  console.log(data);
  return (
    <>
      {isMyOrderOpen && currentUserId && (
        <BackgroundContainer>
          <div>KKKKK</div>
        </BackgroundContainer>
      )}
    </>
  );
};
export default MyOrder;
