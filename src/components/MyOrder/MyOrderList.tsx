import { Flex, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { IOrderItem } from "@/interfaces/order";
import formatCurrency from "@/utils/formatCurrency";
import CancelOrCheckoutOrder from "./CancelOrCheckoutOrder";
import MyOrderItem from "./MyOrderItem";
import calculateDateDifference from "@/utils/calculateDateDifference";

const MyOrderList = ({ ...order }) => {
  const initialQuotation = 0;
  const totalQuotation = order.items.reduce(
    (preValue: number, currentValue: IOrderItem) => preValue + Number(currentValue.quotation),
    initialQuotation
  );

  const {
    days: leftDays,
    hours: leftHours,
    minutes: leftMinutes,
    seconds: leftSeconds,
  } = calculateDateDifference(new Date(), new Date(order.expiredAt));
  return (
    <Flex
      flexDirection="column"
      border="1px"
      borderColor="brand.lightGray"
      minHeight="400px"
      width="90%"
      alignItems="center"
      data-testid="myOrderListItems"
      fontSize="16px"
      fontWeight="bold"
      color="fontcolor.lightDark"
    >
      <Flex
        width="100%"
        height="60px"
        borderBottom="1px"
        borderColor="brand.lightGray"
        justifyContent="center"
        alignItems="center"
        backgroundColor="background.lightblue"
      >
        <Flex justifyContent="space-between" width="90%">
          <Flex
            width="40%"
            flexDirection="column"
            color="fontcolor.deepDark"
            justifyContent="center"
          >
            <Text variant="textFont" fontStyle="italic" fontWeight="300">
              Order ID
            </Text>
            <Text variant="textFont">{order._id}</Text>
          </Flex>
          <Flex width="55%">
            <Flex width="50%" flexDirection="column" justifyContent="center">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Created At
              </Text>
              <Text variant="textFont">
                {format(parseISO(order.createdAt), "dd/MM/yyyy HH:mm")}
              </Text>
            </Flex>

            {order.status === "unpaid" ? (
              <Flex width="50%" flexDirection="column" justifyContent="center">
                <Text variant="textFont" fontStyle="italic" fontWeight="300">
                  Quotation will expire in
                </Text>
                <Text
                  variant="bodyFont"
                  fontStyle="italic"
                  fontWeight="300"
                  color={"fontcolor.red"}
                >
                  {leftDays !== 0 ? (
                    <>
                      {leftDays} days {leftHours} hours
                    </>
                  ) : (
                    <>
                      {leftHours} hours {leftMinutes} minutes {leftSeconds} seconds
                    </>
                  )}
                </Text>
              </Flex>
            ) : order.status !== "expired" && (

              <Flex width="50%" flexDirection="column" justifyContent="center">
                <Text variant="textFont" fontStyle="italic" fontWeight="300">
                  Paid At
                </Text>
                <Text variant="textFont">
                  {order.paidAt ? format(parseISO(order.paidAt), "dd/MM/yyyy HH:mm") : ""}
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex width="5%" justifyContent="flex-end">
            <Flex flexDirection="column" justifyContent="center">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Status
              </Text>
              <Text
                variant="bodyFont"
                color={order.status === "completed" ? "fontcolor.green" : "fontcolor.red"}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width="100%" height="100%">
        <Flex width="30%" borderRight="1px" borderColor="brand.lightGray" justifyContent="center">
          <Flex width="64%" flexDirection="column" gap="20px" margin="25px 0">
            <Text variant="bodyFont" textAlign="center">
              Shipping Information
            </Text>
            <Flex flexDirection="column">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Consignee Name
              </Text>
              <Text variant="textFont">{order.consigneeName ? order.consigneeName : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Consignee Phone No.
              </Text>
              <Text variant="textFont">{order.consigneePhoneNo ? order.consigneePhoneNo : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Consignee Email
              </Text>
              <Text variant="textFont">{order.consigneeEmail ? order.consigneeEmail : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text variant="textFont" fontStyle="italic" fontWeight="300">
                Consignee Address
              </Text>
              <Text variant="textFont">
                {order.status === "completed" ? (
                  <Text>
                    {order.shoppingAddressLine1},{order.shoppingAddressLine2}
                    {order.shoppingAddressLine2 && ","}
                    {order.shoppingAddressCity} {order.shoppingAddressPostalCode},
                    {order.shoppingAddressState},{order.shoppingAddressCountry}
                  </Text>
                ) : (
                  ""
                )}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex width="70%" flexDirection="column">
          <Flex
            height="100%"
            flexDirection="column"
            borderBottom="1px"
            borderColor="brand.lightGray"
            justifyContent="space-evenly"
          >
            <Flex justifyContent="center" alignItems="center">
              <Text variant="bodyFont">Item</Text>
            </Flex>
            {order.items.map((item: IOrderItem) => {
              const mergedItem = {
                ...item,
                orderDepositRatio: order.depositRatio,
                orderStatus: order.status,
              };
              return <MyOrderItem key={item.design.designName} {...mergedItem} />;
            })}
          </Flex>
          <Flex height="100px" justifyContent="center" alignItems="center">
            <Flex
              width="75%"
              flexDirection="column"
              gap="10px"
              justifyContent="center"
              alignItems="flex-end"
            >
              <Flex width="45%" justifyContent="space-between" alignItems="center">
                <Text variant="textFont" fontWeight="400">
                  Total Quotation
                </Text>
                <Text variant="textFont">{formatCurrency(totalQuotation.toFixed(2))}</Text>
              </Flex>
              <Flex
                width="45%"
                justifyContent="space-between"
                alignItems="center"
                color="fontcolor.deepDark"
              >
                <Text variant="textFont">Total Deposit</Text>
                <Text variant="bodyFont">
                  {" "}
                  {formatCurrency((totalQuotation * order.depositRatio).toFixed(2))}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {order.status === "unpaid" || order.status === "expired" && (
        <CancelOrCheckoutOrder
          orderId={order._id}
          userId={order.userId}
          depositRatio={order.depositRatio}
          unPaidItems={order.items}
          isChecked={order.status === "unpaid" ? true : false}
        />
      )}
    </Flex>
  );
};
export default MyOrderList;
