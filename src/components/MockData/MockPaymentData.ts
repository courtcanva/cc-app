import { PageStatus } from "@/constants/paymentResponsePage";
import { IOrderWithPaymentInfo, OrderDetails, PaymentResPage } from "@/interfaces/order";

export const mockPaymentFailurePageData: PaymentResPage = {
  status: PageStatus.FAILURE,
  orderDetails: {
    createdAt: "01/01/2022 11:11",
    paidAt: null,
    amount: "666.66",
    orderId: "123456789",
  },
};

export const mockPaymentSuccessPageData: PaymentResPage = {
  status: PageStatus.SUCCESS,
  orderDetails: {
    createdAt: "02/01/2022 11:11",
    paidAt: "03/01/2022 11:11",
    amount: "2333.33",
    orderId: "1145141919",
  },
};

export const mockPaymentErrorPageData: PaymentResPage = {
  status: PageStatus.ERROR,
};
