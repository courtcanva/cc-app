import { useStoreSelector } from "@/store/hooks";
import { Flex, Text, Checkbox, Button, Link, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { switchOrderGeneration } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "@/redux/api/orderApi";

const OrderContainer = () => {
  const dispatch = useDispatch();
  const orderItems = useStoreSelector((state) => state.order);
  const userId = useStoreSelector((state) => state.user.userId);
  const [isChecked, setIschecked] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  const items = orderItems.map((item) => {
    const orderItem = {
      design: item.design,
      quotation: item.quotation,
      quotationDetails: item.quotationDetails,
      image: item.image,
      constructionDrawing: "todo",
    };
    return orderItem;
  });
  const newOrder = { user_id: userId, status: "unpaid", items, depositRatio: 0.02 };

  const handleProceedToCheckOut = () => createOrder(newOrder);

  const handleBackToCart = () => dispatch(switchOrderGeneration(false));

  return (
    <>
      <Box
        position="fixed"
        top="72px"
        zIndex={1700}
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
            <OrderItem key={item.id} item={item} index={index} />
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
          <Button
            padding="10px 24px"
            fontSize="lg"
            fontWeight="700"
            borderWidth="1px"
            borderColor="brand.primary"
            backgroundColor="#F3F2F7"
            onClick={handleBackToCart}
          >
            Back
          </Button>
          <Button
            variant="shareBtn"
            onClick={handleProceedToCheckOut}
            isDisabled={!isChecked}
            padding="10px 24px"
            fontWeight="700"
          >
            Proceed to Checkout
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default OrderContainer;
