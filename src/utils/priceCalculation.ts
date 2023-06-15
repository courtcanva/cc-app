import { PriceBar } from "@/store/reducer/priceBarSlice";
import { ITilePrice, TilePrices } from "@/interfaces/priceCalculation";
import priceFormat from "@/utils/priceFormat";

export const calculateQuotation = (tileBlocks: PriceBar[], tilePrices: TilePrices) => {
  const { price: tilePricesList, deliveryPrice } = tilePrices;
  const tileQuote = calculateTile(tileBlocks, tilePricesList);
  const deliveryQuote = calculateDelivery(tileBlocks, deliveryPrice);
  return 1.1 * (tileQuote + deliveryQuote);
};

export const calculateDeposit = (totalQuote: number, depositRate: number) => {
  return totalQuote * depositRate;
};

const calculateDelivery = (tileBlocks: PriceBar[], deliveryPrice: number) => {
  let totalQuantity = 0;
  for (const tile of tileBlocks) {
    totalQuantity += tile.quantity;
  }
  return Math.ceil(totalQuantity / 1000) * (deliveryPrice / 100);
};

const calculateTile = (tileBlocks: PriceBar[], tilePricesList: ITilePrice) => {
  const { singleTone, twoTone, threeTone } = tilePricesList;
  const [singleToneNumber, twoToneNumber, threeToneNumber] = [1, 2, 3].map((length) =>
    tileBlocks
      .filter((item) => item.color.split(" ").length === length)
      .map((tile) => tile.quantity)
      .reduce((number, total) => number + total, 0)
  );
  return (
    (singleTone * singleToneNumber + twoTone * twoToneNumber + threeTone * threeToneNumber) / 100
  );
};
