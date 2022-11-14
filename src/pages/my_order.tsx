import MyOrderContainer from "@/components/MyOrder";
import ProfileItemContainer from "@/components/ProfileItemContainer";
import { environment } from "../constants/environment";
import { IMyOrder } from "@/interfaces/order";

const MyOrder = ({ ...props }) => {
  return (
    <ProfileItemContainer>
      <MyOrderContainer myOrders={props.myOrders} />
    </ProfileItemContainer>
  );
};

export default MyOrder;

export const getServerSideProps = async (context: any) => {
  const currentUserId = context.query.user_id;
  const res = await fetch(`${environment.apiBaseUrl}/orders?user_id=${currentUserId}`);
  const ordersData = await res.json();

  const myOrders: IMyOrder[] | undefined = ordersData?.map((order: any) => {
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

  return {
    props: {
      myOrders,
    },
  };
};
