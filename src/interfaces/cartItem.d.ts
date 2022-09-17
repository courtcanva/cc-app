import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

interface ICartItem {
  design: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  previewPic: string;
}
