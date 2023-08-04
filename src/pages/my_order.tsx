import MyOrderContainer from "@/components/MyOrder";
import ProfileItemContainer from "@/components/ProfileItemContainer";
import { IMyOrder } from "@/interfaces/order";
import { useStoreSelector } from "@/store/hooks";
import dynamic from "next/dynamic";
import { api } from "@/utils/axios";
import TokenService from "@/utils/TokenService";
import useAuthRequest from "@/components/Login/helpers/authRequest";
import { useEffect, useState } from "react";

const PdfCanvas = dynamic(() => import("@/components/PdfCanvas"), { ssr: false });
const MyOrder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const courtDesign = useStoreSelector((state) => state.construction.courtDesign);
  const imgSrc = useStoreSelector((state) => state.construction.courtSrc);

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
      {imgSrc && courtDesign && <PdfCanvas courtDesign={courtDesign} imgSrc={imgSrc as string} />}
    </ProfileItemContainer>
  );
};

export default MyOrder;
