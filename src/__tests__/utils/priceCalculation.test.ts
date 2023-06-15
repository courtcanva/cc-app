import { calculateQuotation, calculateDeposit } from "@/utils/priceCalculation";

const tileBlocks = [
  { color: "red", quantity: 1000 },
  { color: "green yellow", quantity: 2000 },
  { color: "green yellow red", quantity: 3000 },
];
const tilePrices = {
  tile_id: "",
  tileName: "mockName",
  deliveryPrice: 2000,
  price: { singleTone: 1000, twoTone: 2000, threeTone: 3000 },
  isDeleted: false,
};

describe("priceCalculation", () => {
  it("should return correct calculation results", () => {
    expect(calculateQuotation(tileBlocks, tilePrices)).toEqual(154132);
    expect(calculateDeposit(100, 100)).toEqual(10000);
  });
});
