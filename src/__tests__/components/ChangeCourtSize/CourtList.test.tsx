import CourtList from "@/components/ChangeCourtSize/CourtList";

test("should have six courts", () => {
  expect(CourtList.length).toBe(6);
});
