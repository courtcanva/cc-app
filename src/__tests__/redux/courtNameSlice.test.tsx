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
  const chosenCourt: CourtNameState = {
    name: "510 m² Pro Court (17 m × 30 m)",
    courtId: "62c432cfb8a9c5f61f03831f",
  };
  expect(reducer(previousState, changeCourtName(chosenCourt))).toEqual(initialState);
});
