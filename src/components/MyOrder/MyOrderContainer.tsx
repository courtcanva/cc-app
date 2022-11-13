import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import { IOrderWithPaymentInfo } from "../../interfaces/order";
import { switchMyOrderDisplay } from "@/store/reducer/buttonToggleSlice";
import MyOrderListItem from "./MyOrderListItem";
import { useDispatch } from "react-redux";
interface Props {
  myOrders: IOrderWithPaymentInfo[];
}
const MyOrderContainer = ({ myOrders }: Props) => {
  const title = "My Order";
  const dispatch = useDispatch();
  const handleReturnToDesign = () => {
    dispatch(switchMyOrderDisplay(false));
  };

  const myOrdersList = (): JSX.Element[] | undefined => {
    return myOrders?.map((order) => {
      console.log(order);
      return <MyOrderListItem key={order._id} {...order} />;
    });
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
