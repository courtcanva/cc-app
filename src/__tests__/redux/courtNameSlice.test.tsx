import reducer, {
  changeCourtName,
  initialState,
  CourtNameState,
} from "@/store/reducer/courtNameSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().courtName;
  expect(state).toEqual(initialState);
});

it("should render correct title", () => {
  const previousState: CourtNameState = initialState;
  expect(reducer(previousState, changeCourtName("blueprint"))).toEqual({ name: "blueprint" });
});
