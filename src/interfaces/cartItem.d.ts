import { IDesign } from "@/interfaces/design";
import PriceBar from "@/components/PriceBar";

interface ICartItem {
  designItem: IDesign;
  quotation: string;
  quotationDetails: PriceBar[];
  // it's ok to be empty in this sprint
  previewPic: string;
}