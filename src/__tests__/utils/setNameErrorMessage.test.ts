import setNameErrorMessage from "../../utils/setNameErrorMessage";

describe("setNameErrorMessage", () => {
  it("should return 'is already existed.'", () => {
    const result = setNameErrorMessage("existed");
    expect(result).toBe(" is already existed.");
  });

  it("should return 'Please enter a name.'", () => {
    const result = setNameErrorMessage("blank");
    expect(result).toBe("Please enter a name.");
  });

  it("should return ' is already existed.'", () => {
    const result = setNameErrorMessage("incorrect");
    expect(result).toBe(" is a incorrect name type.");
  });

  it("should return ''", () => {
    const result = setNameErrorMessage("passCheck");
    expect(result).toBe("");
  });

  it("should return default message", () => {
    const result = setNameErrorMessage("");
    expect(result).toBe(" is already existed.");
  });
});
