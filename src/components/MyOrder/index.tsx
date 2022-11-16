import ListItemsContainer from "../ProfileItemContainer/ListItemContainer";
import MyOrderList from "./MyOrderList";
import { IMyOrder } from "@/interfaces/order";
import { switchMyAccount, switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";
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
    disPatch(switchMyAccount(false));
    disPatch(switchMyTemplateDisplay(false));
  };
  const myOrdersList = () => {
    return myOrders?.map((order) => <MyOrderList key={order._id} {...order} />);
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
