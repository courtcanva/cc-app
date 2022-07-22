import priceFormat from "../../utils/priceFormat";

describe("Adjust number to price format", () => {
  it("should return the right price format if price value is NaN", () => {
    const mockPrice = NaN;
    const formatPrice = priceFormat(mockPrice);
    expect(formatPrice).toStrictEqual("0.00");
  });

  it("should return the right price format if price value has one decimal", () => {
    const mockPrice = 10.7;
    const formatPrice = priceFormat(mockPrice);
    expect(formatPrice).toStrictEqual("10.70");
  });

  it("should return the right price format if price value is int", () => {
    const mockPrice = 10;
    const formatPrice = priceFormat(mockPrice);
    expect(formatPrice).toStrictEqual("10.00");
  });
});
