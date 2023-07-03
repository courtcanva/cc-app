import { findDistinctColor } from "@/utils/findDistinctColor";

describe("findDistinctColor", () => {
  it("should get correct distinct color", () => {
    const colors = ["#000000", "ffffff"];
    expect(findDistinctColor(colors)).toEqual("#bf1fb7");
  });
});
