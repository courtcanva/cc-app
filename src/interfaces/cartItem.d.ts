import { IDesign } from "@/interfaces/design";
import { PriceBar } from "@/store/reducer/priceBarSlice";

interface ICartItem extends IDesign {
  quotation: string;
  quotationDetails: PriceBar[];
  // it's ok to be empty in this sprint
  previewPic: string;
}
