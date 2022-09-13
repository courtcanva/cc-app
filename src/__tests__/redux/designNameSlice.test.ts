import designNameReducer, {
  changeDesignNameList,
  initialState,
  deleteNameFromList,
} from "@/store/reducer/designNameSlice";

describe("designName", () => {
  it("should change design nameList", () => {
    expect(
      designNameReducer(initialState, changeDesignNameList(["Pro Full Court", "Full Court"]))
    ).toEqual({
      ...initialState,
      nameList: ["Pro Full Court", "Full Court"],
    });
  });

  it("should delete design name from list", () => {
    expect(designNameReducer(initialState, deleteNameFromList("Court Canva 1"))).toBeTruthy();
  });
});
