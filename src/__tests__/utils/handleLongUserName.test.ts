import { userNameEllip } from "@/utils/handleLongUserName";

describe("userNameEllip", () => {
  it("should return the ellipsis name", () => {
    const name = "Zark Chen";
    const maxDisplayLength = 6;
    const ellipsisName = userNameEllip(name, maxDisplayLength);
    expect(ellipsisName).toEqual("Zark C...");
  });
});
