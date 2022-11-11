import OrderInfoCard from "@/components/PaymentInfoCard";
import { environment } from "@/constants/environment";
import {
  IOrderDb,
  IOrderWithPaymentInfo,
  IStripeSession,
  PaymentResPage,
} from "@/interfaces/order";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextHeadSeo from "next-head-seo";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { PageStatus } from "@/constants/paymentResponsePage";
import { format, parseISO } from "date-fns";
import { useLazyGetOrderByIdQuery, useCreateStripeSessionMutation } from "../redux/api/orderApi";
import { useEffect } from "react";

interface Props {
  paymentInfo: PaymentResPage;
}

const PaymentResponse = (props: Props) => {
  const { paymentInfo } = props;
  const { status, orderDetails } = paymentInfo;
  const [trigger, { data: rawData }] = useLazyGetOrderByIdQuery();
  const [createStripeSessionMutation] = useCreateStripeSessionMutation();

  if (status === PageStatus.ERROR) return <></>;

  useEffect(() => {
    if (rawData) {
      const data = rawData as IOrderDb;
      createStripeSession(data);
    }
  }, [rawData]);

  const repayOrder = () => {
    trigger(orderDetails?.orderId as string);
  };

  const createStripeSession = async (data: IOrderDb) => {
    const { user_id: userId, items, _id, depositRatio } = data;
    const orderInfo: IStripeSession = { user_id: userId, items, order_Id: _id, depositRatio };
    const sessionUrl = await createStripeSessionMutation(orderInfo)
      .unwrap()
      .then((res) => res.sessionUrl);
    window.location.href = sessionUrl;
  };

  return (
    <>
      <NextHeadSeo
        title="Payment response page - Courtcanva"
        description="Payment success or failure page on CourtCanva"
        canonical="http://www.courtcanva.com/payment"
      />
      <Box
        height="calc(100vh - 72px)"
        width="100vw"
        position="fixed"
        top="72px"
        color="brand.primary"
        minWidth="800px"
        minHeight="600px"
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={{ base: "2rem", md: "2.5rem", lg: "3rem" }}
          marginTop="7vh"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={{ base: "0.5rem", md: "0.9rem", lg: "1.3rem" }}
          >
            <Box
              fontSize={{ base: "2.4rem", md: "3rem", lg: "3.6rem" }}
              color={status === PageStatus.SUCCESS ? "brand.secondary" : "#d64543"}
            >
              {status === PageStatus.SUCCESS ? <IoIosCheckmarkCircleOutline /> : <BiErrorCircle />}
            </Box>
            <Text fontSize={{ base: "1.6rem", md: "2rem", lg: "2.4rem" }} fontWeight="600">
              {status === PageStatus.SUCCESS ? "Payment Successful" : "Payment Failed"}
            </Text>
          </Flex>
          <Flex
            boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
            width="90vw"
            height="45vh"
            borderRadius="1rem"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            paddingTop="1rem"
            minWidth="720px"
          >
            <Text
              fontSize={{ base: "1.2rem", md: "1.5rem", lg: "1.8rem" }}
              fontWeight="600"
              lineHeight="1"
            >
              {status === PageStatus.SUCCESS ? "Thank you!" : "Something went wrong!"}
            </Text>
            <Text
              fontSize={{ base: "0.7rem", md: "0.9rem", lg: "1.1rem" }}
              fontWeight="600"
              paddingBottom="1rem"
            >
              {status === PageStatus.SUCCESS
                ? "You have successfully paid the deposit. Our staff will contact you soon."
                : "Your payment could not be processed. Please try again."}
            </Text>
            <Box height="0.1rem" background="#D3D3D3" width="calc(100% - 30vw)"></Box>
            <OrderInfoCard paymentResPage={paymentInfo} />
          </Flex>
          <Flex justifyContent="center" alignItems="center" gap="3rem">
            <Button variant="shareBtn" padding="1rem 1.5rem" fontSize="1.2rem">
              Check My Order
            </Button>
            {status !== PageStatus.SUCCESS && (
              <Button
                variant="shareBtn"
                padding="1rem 1.5rem"
                fontSize="1.2rem"
                background="#d64543"
                onClick={repayOrder}
              >
                Try Again
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { orderId, status } = context.query;

    const res = await fetch(`${environment.apiBaseUrl}/stripe/paymentInfo/${orderId}`);
    const data = (await res.json()) as IOrderWithPaymentInfo;

    if (!data.order) return { props: { status: PageStatus.ERROR } };

    let paymentStatus: PageStatus;
    status === "success"
      ? (paymentStatus = PageStatus.SUCCESS)
      : (paymentStatus = PageStatus.FAILURE);

    const { items, createdAt, _id, depositRatio } = data.order;

    const totalAmount = (
      Math.round(
        items.reduce((previousValue: number, currentValue: any) => {
          return previousValue + Number(currentValue.quotation) * 100;
        }, 0) * depositRatio
      ) / 100
    ).toString();

    const props: PaymentResPage = {
      status: paymentStatus,
      orderDetails: {
        createdAt: format(parseISO(createdAt), "dd/MM/yyyy HH:mm"),
        paidAt: data.paymentInfo
          ? format(parseISO(data.paymentInfo.createdAt), "dd/MM/yyyy HH:mm")
          : null,
        amount: totalAmount,
        orderId: _id,
      },
    };

    return { props: { paymentInfo: props } };
  } catch {
    return { props: { paymentInfo: { status: PageStatus.ERROR } } };
  }
};

export default PaymentResponse;
