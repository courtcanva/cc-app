import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

export interface ICartItemNew {
  user_id: string;
  design: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  previewPic: string;
}

export interface ICartItem extends ICartItemNew {
  id: string;
}
