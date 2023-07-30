import MyOrderContainer from "@/components/MyOrder";
import ProfileItemContainer from "@/components/ProfileItemContainer";
import { environment } from "../constants/environment";
import { IMyOrder } from "@/interfaces/order";
import { api } from "@/utils/axios";
import TokenService from "@/utils/TokenService";
import useAuthRequest from "@/components/Login/helpers/authRequest";
import { useEffect, useState } from "react";

const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const fetchData = async (setMyOrders: any) => {
      const currentUserId = await TokenService.getUserId();
      const { updateToken } = useAuthRequest();
      let response = await api(`/orders?user_id=${currentUserId}`, {
        method: "GET",
        token: await TokenService.getLocalAccessToken(),
      });

      if (response.status >= 400 && response.status < 500) {
        await updateToken();
        response = await api(`/orders?user_id=${currentUserId}`, {
          method: "GET",
          token: TokenService.getLocalAccessToken(),
        });
      }

      const ordersData = response.data;
      const keyArr = Object.keys(ordersData);
      const myOrdersSpec: IMyOrder[] | undefined = keyArr.map((order) => {
        return {
          user_id: ordersData[order].user_id,
          userId: ordersData[order].user_id,
          _id: ordersData[order]._id,
          status: ordersData[order].status,
          createdAt: ordersData[order].createdAt,
          paidAt: ordersData[order].paymentInfo ? ordersData[order].paymentInfo.updatedAt : "",
          consigneeName: ordersData[order].paymentInfo ? ordersData[order].paymentInfo.name : "",
          consigneePhoneNo: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.phone
            : "",
          consigneeEmail: ordersData[order].paymentInfo ? ordersData[order].paymentInfo.email : "",
          shoppingAddressCity: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.city
            : "",
          shoppingAddressState: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.state
            : "",
          shoppingAddressCountry: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.country
            : "",
          shoppingAddressLine1: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.line1
            : "",
          shoppingAddressLine2: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.line2
            : "",
          shoppingAddressPostalCode: ordersData[order].paymentInfo
            ? ordersData[order].paymentInfo.constructionAddress.postalCode
            : "",
          currency: ordersData[order].paymentInfo ? ordersData[order].paymentInfo.currency : "aud",
          depositRatio: ordersData[order].depositRatio,
          items: ordersData[order].items,
        };
      });
      setMyOrders(myOrdersSpec);
    };

    fetchData(setMyOrders);
  }, []);

  return (
    <ProfileItemContainer>
      <MyOrderContainer myOrders={myOrders} />
    </ProfileItemContainer>
  );
};

export default MyOrder;
