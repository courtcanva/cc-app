import { screen } from "@testing-library/react";
import TileBoard from "@/components/TileBoard";
import renderWithMockedProvider from "../../utils";
import { changeTileQuantity } from "@/store/reducer/priceBarSlice";
import { getColorList } from "@/store/reducer/colorListSlice";
import store from "@/store/index";
import { handlers } from "../../mockApi/handlers";
import { setupServer } from "msw/node";

const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("TileBoard", () => {
  const preloadedState = {
    priceBarState: [
      { color: "red", quantity: 10 },
      { color: "green", quantity: 20 },
      { color: "yellow", quantity: 30 },
      { color: "yellow red", quantity: 40 },
      { color: "yellow red green", quantity: 50 },
    ],
    colorListState: [
      {
        _id: "mockId",
        name: "mockName",
        colors: [
          { name: "red", value: "red" },
          { name: "green", value: "green" },
          { name: "yellow", value: "yellow" },
        ],
      },
    ],
  };

  store.dispatch(changeTileQuantity(preloadedState.priceBarState));
  store.dispatch(getColorList(preloadedState.colorListState));
  renderWithMockedProvider(<TileBoard />);
  it("Should render tile blocks", () => {
    const tileElements = screen.getAllByRole("tileBlock");
    expect(tileElements.length).toBe(preloadedState.priceBarState.length);
  });
});
