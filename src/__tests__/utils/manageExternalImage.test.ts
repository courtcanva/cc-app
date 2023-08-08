import { inputImageCheck } from "@/utils/manageExternalImage";

describe("manageExternalImage", () => {
  const toast = jest.fn();

  it("show true if the file is image and size between 1KB to 10KB", () => {
    const file = new File([], "test", { type: "image/jpg" });
    expect(inputImageCheck(file, 1, 10, toast)).toBe(true);
  });

  it("show false if the file is not image", () => {
    const file = new File([], "test", { type: "txt" });
    expect(inputImageCheck(file, 1, 10, toast)).toBe(false);
  });
});
