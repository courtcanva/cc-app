import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";
import { PageStatus } from "@/constants/paymentResponsePage";
import MyOrder from "@/pages/my_order";

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
  status: string;
  _id: string;
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

export interface IMyOrder extends IOrder {
  _id: string;
  status: string;
  createdAt: string;
  isExpired: boolean;
  expiredAt: string;
  paidAt: string | null;
  currency: string;
  consigneeEmail: string | null;
  consigneeName: string | null;
  consigneePhoneNo: string | null;
  shoppingAddressCity: string | null;
  shoppingAddressCountry: string | null;
  shoppingAddressLine1: string | null;
  shoppingAddressLine2: string | null;
  shoppingAddressPostalCode: string | null;
  shoppingAddressState: string | null;
}
