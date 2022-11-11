import { PaymentResPage } from "@/interfaces/order";
import { PageStatus } from "@/constants/paymentResponsePage";
import Failure from "./Failure";
import Success from "./Success";

interface Props {
  paymentResPage: PaymentResPage;
}

const OrderInfoCard = (props: Props) => {
  const { status, orderDetails } = props.paymentResPage;
  if (!orderDetails) return <></>;

  return (
    <>
      {status === PageStatus.SUCCESS ? (
        <Success orderDetails={orderDetails} />
      ) : (
        <Failure orderDetails={orderDetails} />
      )}
    </>
  );
};

export default OrderInfoCard;
