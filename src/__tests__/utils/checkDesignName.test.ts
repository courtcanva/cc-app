import checkDesignName from "@/utils/checkDesignName";

describe("checkName is working", () => {
  it("should return please enter a design name.", () => {
    const nameCheck = checkDesignName("", ["Pro Full Court"]);
    expect(nameCheck).toEqual("Please enter a design name.");
  });

  it("should return design name has already existed.", () => {
    const nameCheck = checkDesignName("Pro Full Court", ["Pro Full Court"]);
    expect(nameCheck).toEqual("Pro Full Court has already existed.");
  });

  it("should return design name should only contain letter, number and space.", () => {
    const nameCheck = checkDesignName("court!", ["Pro Full Court"]);
    expect(nameCheck).toEqual("Design name should only contain letter, number and space.");
  });

  it("should return empty if the design name meet the requirement", () => {
    const nameCheck = checkDesignName("Court", ["Pro Full Court"]);
    expect(nameCheck).toEqual("");
  });
});
