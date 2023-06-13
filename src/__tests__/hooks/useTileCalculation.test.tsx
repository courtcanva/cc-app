import { useTileCalculation } from "@/hooks/useTileCalculation";
import * as tileNumberCalculator from "@/utils/tileNumberCalculator";
import * as priceBarSlice from "@/store/reducer/priceBarSlice";
import { waitFor } from "@testing-library/dom";
import { createRef } from "react";
import Konva from "konva";
import renderWithMockedProvider from "../utils";
import store from "@/store/index";
import { getColorList } from "@/store/reducer/colorListSlice";
import { ITileColor } from "@/interfaces/color";

const colorListState: ITileColor[] = [
  {
    _id: "mockId",
    name: "mockName",
    colors: [
      { name: "red", value: "red" },
      { name: "green", value: "green" },
      { name: "yellow", value: "yellow" },
    ],
  },
];

const colorListStateNone: ITileColor[] = [];

describe("useTileCalculation", () => {
  const mockCalculation = jest.spyOn(tileNumberCalculator, "calculation");
  const mockChangeTileQuantity = jest.spyOn(priceBarSlice, "changeTileQuantity");
  const testLayerRef = createRef<Konva.Layer>();
  it("should not call calculation function when color list length is 0", async () => {
    store.dispatch(getColorList(colorListStateNone));
    const TestComponent = () => {
      useTileCalculation(testLayerRef);
      return <div />;
    };
    renderWithMockedProvider(<TestComponent />);
    await new Promise((r) => setTimeout(r, 500));
    expect(mockChangeTileQuantity).toBeCalledTimes(0);
  });
  it("should change tile quantity with the result of calculation", async () => {
    store.dispatch(getColorList(colorListState));
    const TestComponent = () => {
      useTileCalculation(testLayerRef);
      return <div />;
    };
    mockCalculation.mockImplementation(() => [{ color: "red", quantity: 1 }]);
    renderWithMockedProvider(<TestComponent />);
    await waitFor(() =>
      expect(mockChangeTileQuantity).toBeCalledWith([{ color: "red", quantity: 1 }])
    );
  });
});
