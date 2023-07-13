import store from "@/store/index";
import reducer, {
  initialState,
  changeConstructionInfo,
  changeConstructionSrc,
  ConstructionState,
} from "@/store/reducer/constructionSlice";

const constructionInfo = {
  beginPointX: 1,
  beginPointY: 1,
  endPointX: 1,
  endPointY: 1,
  tileSize: 1,
};

it("should return the initial state", () => {
  const state = store.getState().construction;
  expect(state).toEqual(initialState);
});

it("should render correct construction information", () => {
  const previousState: ConstructionState = initialState;
  expect(reducer(previousState, changeConstructionInfo(constructionInfo))).toEqual({
    ...previousState,
    constructionInfo: {
      beginPointX: 1,
      beginPointY: 1,
      endPointX: 1,
      endPointY: 1,
      tileSize: 1,
    },
  });
});

it("should render correct construction source", () => {
  const previousState: ConstructionState = initialState;
  expect(reducer(previousState, changeConstructionSrc("mockSrc"))).toEqual({
    ...previousState,
    constructionSrc: "mockSrc",
  });
});
