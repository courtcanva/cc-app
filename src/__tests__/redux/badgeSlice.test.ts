import reducer, { initialState, switchBadgeUsed, setBadgeImage } from "@/store/reducer/badgeSlice";

describe("Badge Reducer", () => {
  it("should switch badge used state", () => {
    expect(reducer(initialState, switchBadgeUsed(true))).toEqual({
      ...initialState,
      isBadgeUsed: true,
    });
  });

  it("should switch badge state state", () => {
    const newBadge = { badgeImageUrl: "", width: 1, height: 1 };
    expect(reducer(initialState, setBadgeImage(newBadge))).toEqual({
      ...initialState,
      badgeImage: newBadge,
    });
  });
});
