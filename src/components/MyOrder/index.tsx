import ProfileItemContainer from "../ProfileItemContainer";
import { userData } from "@/store/reducer/userSlice";
import { useStoreSelector } from "@/store/hooks";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { IOrderWithPaymentInfo } from "../../interfaces/order";
import MyOrderContainer from "./MyOrderContainer";

const MyOrder = () => {
  const isMyOrderOpen = useStoreSelector((state) => state.buttonToggle.isMyOrderOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data: ordersData } = useGetOrdersQuery(currentUserId ? currentUserId : skipToken);
  console.log(ordersData);

  const myOrders: IOrderWithPaymentInfo[] = ordersData?.map((order: any) => {
    return {
      userId: order.user_id,
      _id: order._id,
      status: order.status,
      createdAt: order.createdAt,
      paidAt: order.paymentInfo ? order.paymentInfo.createdAt : "",
      consigneeName: order.paymentInfo ? order.paymentInfo.name : "",
      consigneePhoneNo: order.paymentInfo ? order.paymentInfo.phone : "",
      consigneeEmail: order.paymentInfo ? order.paymentInfo.email : "",
      shoppingAddressCity: order.paymentInfo ? order.paymentInfo.constructionAddress.city : "",
      shoppingAddressState: order.paymentInfo ? order.paymentInfo.constructionAddress.state : "",
      shoppingAddressCountry: order.paymentInfo
        ? order.paymentInfo.constructionAddress.country
        : "",
      shoppingAddressLine1: order.paymentInfo ? order.paymentInfo.constructionAddress.line1 : "",
      shoppingAddressLine2: order.paymentInfo ? order.paymentInfo.constructionAddress.line2 : "",
      shoppingAddressPostalCode: order.paymentInfo
        ? order.paymentInfo.constructionAddress.postalCode
        : "",
      currency: order.paymentInfo ? order.paymentInfo.currency : "aud",
      depositRatio: order.depositRatio,
      items: order.items,
    };
  });
  console.log(myOrders);
  return (
    <>
      {isMyOrderOpen && currentUserId && (
        <ProfileItemContainer>
          <MyOrderContainer myOrders={myOrders} />
        </ProfileItemContainer>
      )}
    </>
  );
};
export default MyOrder;
