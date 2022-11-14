import { Flex, Text } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { IOrderItem } from "../../interfaces/order";

import CancelOrCheckoutOrder from "./CancelOrCheckoutOrder";
import MyOrderItem from "./MyOrderItem";

const MyOrderList = ({ ...order }) => {
  const initialQuotation = 0;
  const totalQuotation = order.items.reduce(
    (preValue: number, currentValue: IOrderItem) => preValue + Number(currentValue.quotation),
    initialQuotation
  );
  // const numberWithCommas = (x: string) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

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
            <Text fontSize="14px" fontStyle="italic" fontWeight="300">
              Order ID
            </Text>
            <Text fontSize="14px">{order._id}</Text>
          </Flex>
          <Flex width="55%">
            <Flex width="50%" flexDirection="column" justifyContent="center">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Created At
              </Text>
              <Text>{format(parseISO(order.createdAt), "dd/MM/yyyy HH:mm")}</Text>
            </Flex>
            <Flex width="50%" flexDirection="column" justifyContent="center">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Paid At
              </Text>
              <Text>
                {order.paidAt ? format(parseISO(order.createdAt), "dd/MM/yyyy HH:mm") : ""}
              </Text>
            </Flex>
          </Flex>
          <Flex width="5%" justifyContent="flex-end">
            <Flex flexDirection="column" justifyContent="center">
              <Text fontSize="14px" fontStyle="italic" fontWeight="300">
                Status
              </Text>
              <Text
                color={order.status === "completed" ? "fontcolor.green" : "fontcolor.red"}
                fontSize="20px"
              >
                {order.status === "completed" ? "Paid" : "Unpaid"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width="100%" height="100%">
        <Flex width="30%" borderRight="1px" borderColor="brand.lightGray" justifyContent="center">
          <Flex width="64%" flexDirection="column" gap="20px" marginTop="25px">
            <Text fontSize="20px" textAlign="center">
              Shipping Information
            </Text>
            <Flex flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Consignee Name
              </Text>
              <Text>{order.consigneeName ? order.consigneeName : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Consignee Phone No.
              </Text>
              <Text>{order.consigneePhoneNo ? order.consigneePhoneNo : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Consignee Email
              </Text>
              <Text>{order.consigneeEmail ? order.consigneeEmail : ""}</Text>
            </Flex>
            <Flex flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Consignee Address
              </Text>
              <Text>
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
              <Text fontSize="20px">Item</Text>
            </Flex>
            {order.items.map((item: IOrderItem) => {
              const mergedItem = { ...item, orderDepositRatio: order.depositRatio };
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
              <Flex width="45%" justifyContent="space-between">
                <Text fontWeight="400">Total Quotation</Text>
                <Text>{`A$${Number(totalQuotation.toFixed(2)).toLocaleString()}`}</Text>
              </Flex>
              <Flex width="45%" justifyContent="space-between" color="fontcolor.deepDark">
                <Text fontSize="14px">Total Deposit</Text>
                <Text fontSize="20px">
                  {" "}
                  {`A$${Number((totalQuotation * order.depositRatio).toFixed(2)).toLocaleString()}`}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {order.status === "completed" ? (
        ""
      ) : (
        <CancelOrCheckoutOrder
          orderId={order._id}
          userId={order.userId}
          depositRatio={order.depositRatio}
          unPaidItems={order.items}
        />
      )}
    </Flex>
  );
};
export default MyOrderList;
