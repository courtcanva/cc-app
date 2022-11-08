import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";
import { PageStatus } from "@/constants/paymentResponsePage";

interface IOrderItem {
  design: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  image: string;
  constructionDrawing: string;
}

export interface IOrder {
  user_id: string;
  items: IOrderItem[];
  depositRatio: number;
}

export interface IStripeSession extends IOrder {
  order_Id: string;
}

interface IPaymentInfoDb {
  createdAt: string;
}

interface IOrderDb extends IOrder {
  createdAt: string;
  _id: string;
}

export interface IOrderWithPaymentInfo {
  order: IOrderDb;
  paymentInfo?: IPaymentInfoDb;
}

export interface OrderDetails {
  createdAt: string;
  paidAt: string | null;
  amount: string;
  orderId: string;
}

export interface PaymentResPage {
  status: PageStatus;
  orderDetails?: OrderDetails;
}