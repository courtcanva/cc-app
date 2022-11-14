import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import MyOrderList from "./MyOrderList";
import { IMyOrder } from "@/interfaces/order";
import { switchCartDisplay } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
interface Props {
  myOrders: IMyOrder[];
}
const MyOrderContainer = ({ myOrders }: Props) => {
  const title = "My Orders";

  const router = useRouter();
  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    router.push("/");
    disPatch(switchCartDisplay());
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
