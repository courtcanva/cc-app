import { courtSpecMapping } from "@/utils/courtSpecMapping";
import { CourtSpecMapper } from "@/store/reducer/courtSpecDataSlice";

it("should return correct mapped data", () => {
  const data: CourtSpecMapper = {
    courtId: "0001",
    name: "Pro Full Court",
    length: "1000",
    width: "1000",
    threePointLine: "1000",
    threePointRadius: "1000",
    centreCircleRadius: "1000",
    restrictedAreaLength: "1000",
    restrictedAreaWidth: "1000",
    sideBorderWidth: "1000",
    lengthOfCorner: "1000",
    lineBorderWidth: "1000",
  };
  const designName = "designName";
  const courtId = "001";

  const mappedData = {
    courtId: "001",
    designName: "designName",
    courtAreaXLength: "1000",
    courtAreaYLength: "1000",
    threePointLineToCourtEdgeLength: "1000",
    threePointLineRadius: "1000",
    circleRadius: "1000",
    keyAreaWidth: "1000",
    keyAreaHeight: "1000",
    borderLength: "1000",
    cornerThreePointLineLength: "1000",
    strokeWidth: "1000",
    courtName: "Pro Full Court",
  };
  const result = courtSpecMapping(data, designName, courtId);
  expect(result).toStrictEqual(mappedData);
});
