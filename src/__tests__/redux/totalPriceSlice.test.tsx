import reducer, {
  changeTotalPrice,
  initialState,
  TotalPriceState,
} from "@/store/reducer/totalPriceSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().totalPrice;
  expect(state).toEqual(initialState);
});

it("should render updated price", () => {
  const previousState: TotalPriceState = initialState;
  expect(reducer(previousState, changeTotalPrice("55000.00"))).toEqual({
    ...previousState,
    budget: "55000.00",
  });
});
