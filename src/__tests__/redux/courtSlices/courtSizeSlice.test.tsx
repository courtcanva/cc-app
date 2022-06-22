import reducer, {
  initialState,
  CourtSizeState,
  dimensionColor,
  borderSize,
} from "@/store/reducer/courtSizeSlice";
import store from "@/store/index";
import { MIN_DIMENSION_BOX } from "../../../constants/courtSize";

it("should return the initial state", () => {
  const state = store.getState().courtSize;
  expect(state).toEqual(initialState);
});

// describe("dimensionColor", () => {
//   let color: string;
//   it("Should have white color", () => {
//     initialState.borderLength >= MIN_DIMENSION_BOX;
//     dimensionColor;
//     expect(color).toEqual("white");
//   });

//   it("Should have white black", () => {
//     initialState.borderLength < MIN_DIMENSION_BOX;
//     dimensionColor;
//     expect(color).toEqual("black");
//   });
// });

// describe("borderSize", () => {
//   let element: number;
//   it("Should have white color", () => {
//     initialState.borderLength >= MIN_DIMENSION_BOX;
//     borderSize;
//     expect(element).toEqual(initialState.borderLength);
//   });
//   it("Should have white black", () => {
//     initialState.borderLength < MIN_DIMENSION_BOX;
//     borderSize;
//     expect(element).toEqual(MIN_DIMENSION_BOX);
//   });
// });
