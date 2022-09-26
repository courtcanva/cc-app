import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

export interface ICartItem {
  user_id: string;
  design: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  previewPic: string;
}
