import reducer, {
  getColorList,
  initialState,
  ColorListState,
} from "@/store/reducer/colorListSlice";
import store from "@/store/index";

it("should return the initial state", () => {
  const state = store.getState().colorList;
  expect(state).toEqual(initialState);
});

it("should render correct color list state", () => {
  const previousState: ColorListState = initialState;
  const colorList = [
    {
      _id: "123456",
      name: "Elite X II",
      colors: [
        { name: "Light green", value: "#305236" },
        { name: "Forest green", value: "#314B33" },
        { name: "Dark Green", value: "#43554A" },
        { name: "Blue Stone", value: "#195955" },
      ],
    },
  ];
  expect(reducer(previousState, getColorList(colorList))).toEqual({
    ...previousState,
    colorList: colorList,
  });
});
