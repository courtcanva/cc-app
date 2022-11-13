import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import { IOrderWithPaymentInfo } from "../../interfaces/order";
import { switchMyOrderDisplay } from "@/store/reducer/buttonToggleSlice";
import MyOrderList from "./MyOrderList";
import { useDispatch } from "react-redux";
interface Props {
  myOrders: IOrderWithPaymentInfo[];
}
const MyOrderContainer = ({ myOrders }: Props) => {
  const title = "My Orders";
  const dispatch = useDispatch();
  const handleReturnToDesign = () => {
    dispatch(switchMyOrderDisplay(false));
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
