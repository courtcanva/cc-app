import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

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

interface IPaymentInfoDb {
  createdAt: string;
}

interface IOrderDb extends IOrder {
  createdAt: string;
  _id: string;
}

export interface IOrderWithPaymentInfo {
  _id: Key | null | undefined;
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
