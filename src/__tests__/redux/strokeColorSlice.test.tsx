import reducer, {
  initialState,
  changeStrokeColor,
  IStrokeColorState,
} from "@/store/reducer/strokeColorSlice";

it("should change stroke color", () => {
  const previousState: IStrokeColorState = initialState;

  expect(
    reducer(previousState, changeStrokeColor({ location: "keyArea", strokeColor: "white" }))
  ).toEqual(previousState);
});
