import { useStoreSelector } from "@/store/hooks";
import { Flex, Text, Checkbox, Button, Link } from "@chakra-ui/react";
import React, { useState } from "react";
import OrderItem from "./OrderItem";
import { switchOrderGeneration } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { depositRatio } from "@/constants/depositRatio";

const OrderGeneration = () => {
  const dispatch = useDispatch();
  const orderItems = useStoreSelector((state) => state.order);
  const userId = useStoreSelector((state) => state.user.userId);
  const { isOrderGenerationOpen } = useStoreSelector((state) => state.buttonToggle);
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
  const newOrder = { user_id: userId, status: "unpaid", items, depositRatio };

  const handleProceedToCheckOut = () => createOrder(newOrder);

  const handleBackToCart = () => dispatch(switchOrderGeneration(false));

  return (
    <>
      {isOrderGenerationOpen && (
        <Flex
          position="fixed"
          top="72px"
          zIndex={1700}
          backgroundColor="#fff"
          padding="30px 30px"
          color="brand.primary"
          height="calc(100vh - 72px)"
          flexDirection="column"
          alignItems="center"
          gap="30px"
          overflow="auto"
          justifyContent="space-between"
        >
          <Text fontSize="32px" fontWeight="700" textAlign="center">
            Order Generation
          </Text>
          {orderItems.map((item, index) => (
            <OrderItem key={item.id} item={item} index={index} />
          ))}
          <Checkbox
            fontSize="20px"
            fontWeight="500px"
            letterSpacing="1px"
            isChecked={isChecked}
            onChange={(e) => setIschecked(e.target.checked)}
          >
            I agree with the{" "}
            <Link textDecoration="underline" fontWeight="700">
              terms & conditions
            </Link>{" "}
            of CourtCanva
          </Checkbox>
          <Flex gap="80px">
            <Button
              padding="10px 24px"
              fontSize="18px"
              fontWeight="700px"
              borderWidth="1px"
              onClick={handleBackToCart}
            >
              Back
            </Button>
            <Button variant="shareBtn" onClick={handleProceedToCheckOut} isDisabled={!isChecked}>
              Proceed to Checkout
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default OrderGeneration;
