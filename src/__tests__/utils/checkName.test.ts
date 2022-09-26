import checkName, { setValidation } from "@/utils/checkName";

describe("checkName is working", () => {
  const validation = setValidation({ maxCharLength: 15, onlyWordChar: true });
  it("should return existed", () => {
    const nameCheck = checkName("Pro Full Court", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("existed");
  });

  it("should return blank", () => {
    const nameCheck = checkName("", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("blank");
  });

  it("should return invalid", () => {
    const nameCheck = checkName("court!", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("invalid");
  });
});
