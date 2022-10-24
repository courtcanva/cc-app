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
  status: string;
  items: IOrderItem[];
  depositRatio: number;
}
