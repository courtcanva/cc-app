import checkName, { setValidation } from "@/utils/checkName";

describe("checkName is working", () => {
  let validation = setValidation({ maxCharLength: 15 });
  it("should return existed", () => {
    const nameCheck = checkName("Pro Full Court", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("existed");
  });

  it("should return blank", () => {
    const nameCheck = checkName("", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("blank");
  });

  it("should return passCheck", () => {
    const nameCheck = checkName("court!", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("passCheck");
  });

  it("should return invalid by passing illegal name", () => {
    validation = setValidation({ maxCharLength: 15, onlyWordChar: true });
    const nameCheck = checkName("court!", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("invalid");
  });

  it("should return invalid by passing canBeBlank", () => {
    validation = setValidation({ maxCharLength: 15, canBeBlank: true });
    const nameCheck = checkName("", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("passCheck");
  });

  it("should return invalid by passing minCharLength", () => {
    validation = setValidation({ maxCharLength: 15, minCharLength: 2 });
    const nameCheck = checkName("a", ["Pro Full Court"], validation);
    expect(nameCheck).toEqual("invalid");
  });
});
