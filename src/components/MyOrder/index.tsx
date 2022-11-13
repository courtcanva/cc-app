import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import MyOrderList from "./MyOrderList";
import { IOrderWithPaymentInfo } from "../../interfaces/order";
import { useRouter } from "next/router";
interface Props {
  myOrders: IOrderWithPaymentInfo[];
}
const MyOrderContainer = ({ myOrders }: Props) => {
  const title = "My Orders";

  const router = useRouter();
  const handleReturnToDesign = () => {
    router.push("/");
  };
  const myOrdersList = () => {
    return myOrders?.map(
      (order) => order.status !== "cancelled" && <MyOrderList key={order._id} {...order} />
    );
  };
  return (
    <ListItemsContainer
      title={title}
      onClickHandler={handleReturnToDesign}
      myListsArrayFc={myOrdersList}
      listArray={myOrders}
    />
  );
};
export default MyOrderContainer;
