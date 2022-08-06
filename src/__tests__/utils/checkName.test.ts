import checkName from "@/utils/checkName";

describe("checkName is working", () => {
  it("should return existed", () => {
    const nameCheck = checkName("Pro Full Court", ["Pro Full Court"]);
    expect(nameCheck).toEqual("existed");
  });

  it("should return blank", () => {
    const nameCheck = checkName("", ["Pro Full Court"]);
    expect(nameCheck).toEqual("blank");
  });
});
