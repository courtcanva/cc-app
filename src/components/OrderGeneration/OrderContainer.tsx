import { useStoreSelector } from "@/store/hooks";
import { Flex, Text, Checkbox, Link, Box, Tooltip, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { switchOrderGeneration } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation, useCreateStripeSessionMutation } from "@/redux/api/orderApi";
import { IStripeSession } from "@/interfaces/order";
import { useDeleteItemFromCartMutation } from "@/redux/api/cartApi";
import ProcessToCheckOutButton from "./ProcessToCheckoutButton";
import CancelOrBackButton from "./CancelOrBackButton";
import { useGetDepositQuery } from "@/redux/api/depositApi";

const OrderContainer = () => {
  const dispatch = useDispatch();
  const orderItems = useStoreSelector((state) => state.order);
  const userId = useStoreSelector((state) => state.user.userId);
  const [isChecked, setIschecked] = useState(false);
  const [createOrder] = useCreateOrderMutation();
  const [createStripeSessionMutation] = useCreateStripeSessionMutation();
  const [deleteItemFromCart] = useDeleteItemFromCartMutation();
  const { data: depositData } = useGetDepositQuery();
  const toast = useToast();
  const buttonTitle = "Back";
  const items = orderItems.map((item) => {
    const orderItem = {
      design: item.design,
      quotation: item.quotation,
      quotationDetails: item.quotationDetails,
      image: item.image,
      constructionDrawing: item.constructionDrawing as string,
    };
    return orderItem;
  });
  const newOrder = { user_id: userId, items, depositRatio: depositData?.depositRate };

  const handleProceedToCheckOut = async () => {
    try {
      const orderId = await createOrder(newOrder)
        .unwrap()
        .then((res) => res._id);

      orderItems &&
        orderItems.forEach((item) => {
          deleteItemFromCart(item.id);
        });

      const sessionData: IStripeSession = {
        ...newOrder,
        order_Id: orderId,
      };
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
  const handleBackToCart = () => dispatch(switchOrderGeneration(false));

  return (
    <>
      <Box
        position="fixed"
        top="72px"
        zIndex={3999}
        backgroundColor="#fff"
        padding="43px 78px 53px 78px"
        color="brand.primary"
        height="calc(100vh - 72px)"
        flexDirection="column"
        overflow="auto"
        width="100vw"
      >
        <Text fontSize="32px" fontWeight="700" textAlign="center" marginBottom="28px">
          Order Generation
        </Text>
        <Flex flexDirection="column" gap="71px">
          {orderItems.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              index={index}
              depositRatio={depositData?.depositRate}
            />
          ))}
        </Flex>
        <Box textAlign="center">
          <Checkbox
            fontWeight="500"
            marginBottom="52px"
            marginTop="50px"
            isChecked={isChecked}
            onChange={(e) => setIschecked(e.target.checked)}
            spacing="20px"
            size="lg"
          >
            I agree with the{" "}
            <Link textDecoration="underline" fontWeight="700">
              terms & conditions
            </Link>{" "}
            of CourtCanva
          </Checkbox>
        </Box>
        <Flex gap="100px" justifyContent="center">
          <CancelOrBackButton buttonTitle={buttonTitle} handleBackToCart={handleBackToCart} />
          <Tooltip label="Please agree the terms and conditions" isDisabled={isChecked}>
            <ProcessToCheckOutButton
              isChecked={isChecked}
              handleProceedToCheckOut={handleProceedToCheckOut}
            />
          </Tooltip>
        </Flex>
      </Box>
    </>
  );
};

export default OrderContainer;
