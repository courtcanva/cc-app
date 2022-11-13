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
      fontWeight="700"
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
          <Flex width="30%" flexDirection="column">
            <Text fontSize="12px" fontStyle="italic" fontWeight="300">
              Order ID
            </Text>
            <Text fontSize="14px">{order._id}</Text>
          </Flex>
          <Flex width="60%" justifyContent="space-between">
            <Flex width="50%" flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Created At
              </Text>
              <Text>{format(parseISO(order.createdAt), "dd/mm/yyyy hh:mm")}</Text>
            </Flex>
            <Flex width="50%" flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Paid At
              </Text>
              <Text>
                {order.paidAt ? format(parseISO(order.createdAt), "dd/mm/yyyy hh:mm") : ""}
              </Text>
            </Flex>
          </Flex>
          <Flex width="5%" justifyContent="flex-end">
            <Flex flexDirection="column">
              <Text fontSize="12px" fontStyle="italic" fontWeight="300">
                Status
              </Text>
              <Text color={order.status === "completed" ? "fontcolor.green" : "fontcolor.red"}>
                {order.status === "completed" ? "Paid" : "Unpaid"}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex width="100%" height="100%" borderBottom="1px" borderColor="brand.lightGray">
        <Flex width="30%" borderRight="1px" borderColor="brand.lightGray" justifyContent="center">
          <Flex width="64%" flexDirection="column" gap="20px" marginTop="30px">
            <Text fontSize="20px" textAlign="center">
              Shopping Information
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
              <Flex width="35%" justifyContent="space-between">
                <Text fontWeight="400">Total Quotation</Text>
                <Text>{`A$${totalQuotation.toFixed(2)}`}</Text>
              </Flex>
              <Flex width="35%" justifyContent="space-between">
                <Text fontSize="14px">Total Deposit</Text>
                <Text fontSize="20px">
                  {" "}
                  {`A$${(totalQuotation * order.depositRatio).toFixed(2)}`}
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