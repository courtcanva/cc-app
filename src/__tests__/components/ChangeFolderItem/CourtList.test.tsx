import CourtList from "@/components/ChangeFolderItem/CourtList";

test("should have six courts", () => {
  expect(CourtList.length).toBe(6);
});
