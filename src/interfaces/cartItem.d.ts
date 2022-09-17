import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

interface ICartItem {
  user_id: string;
  design: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  previewPic: string;
}
