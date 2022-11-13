import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import CancelOrBackButton from "../OrderGeneration/CancelOrBackButton";
import ProcessToCheckOutButton from "../OrderGeneration/ProcessToCheckoutButton";
import ConfirmModal from "../ComfirmModal";
import { IStripeSession } from "@/interfaces/order";
import { useDeleteOrderMutation, useCreateStripeSessionMutation } from "@/redux/api/orderApi";
import { IOrderItem } from "../../interfaces/order";
interface Props {
  orderId: string;
  userId: string;
  depositRatio: number;
  unPaidItems: IOrderItem[];
}
const CancelOrCheckoutOrder = ({ orderId, userId, depositRatio, unPaidItems }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteOrder] = useDeleteOrderMutation();
  const [createStripeSessionMutation] = useCreateStripeSessionMutation();
  const toast = useToast();
  const isChecked = true;
  const buttonTitle = "Cancel Order";

  const newOrder = { order_Id: orderId, user_id: userId, items: unPaidItems, depositRatio };

  const handleProceedToCheckOut = async () => {
    try {
      const sessionData: IStripeSession = newOrder;
      const sessionUrl = await createStripeSessionMutation(sessionData)
        .unwrap()
        .then((res) => res.sessionUrl);

      window.location.href = sessionUrl;
    } catch {
      return toast({
        title: "Fail to redirect to payment page",
        description: "Please try again or contact IT support!",
        isClosable: true,
        position: "bottom",
        duration: 9000,
        status: "error",
      });
    }
  };

  const handleCancelOrder = () => {
    onOpen();
  };
  const handleModalConfirm = () => {
    deleteOrder(orderId);
    onClose();
  };

  return (
    <>
      <Flex width="100%" height="95px" justifyContent="center" alignItems="center">
        <Flex gap="20px">
          <CancelOrBackButton buttonTitle={buttonTitle} handleBackToCart={handleCancelOrder} />
          <ProcessToCheckOutButton
            isChecked={isChecked}
            handleProceedToCheckOut={handleProceedToCheckOut}
          />
        </Flex>
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleModalConfirm}
        buttonText="Cancel"
        alertText="permanently delete your order"
      />
    </>
  );
};

export default CancelOrCheckoutOrder;
