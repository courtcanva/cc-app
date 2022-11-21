import { CourtSizeState } from "@/store/reducer/courtSpecDataSlice";
import { Court } from "@/store/reducer/tileSlice";
import generateNewTemplate from "@/utils/generateNewTemplate";

describe("generateNewTemplate", () => {
  it("should the correct template data", () => {
    const mockTemplateData = {
      _id: "",
      user_id: "123456",
      description: "This is description",
      design: {
        designer: "Zark",
        user_id: "",
        courtType: "basketball",
        designName: "Cecilia's Court",
        tileColor: [],
        courtSize: {
          name: "Pro Full Court",
          length: 1,
          width: 1,
          threePointLine: 4,
          threePointRadius: 1,
          centreCircleRadius: 9,
          restrictedAreaLength: 4,
          restrictedAreaWidth: 1,
          sideBorderWidth: 9,
          lengthOfCorner: 5,
          lineBorderWidth: 1,
          designName: "",
          image: "",
        },
        image: "",
      },
      image: "image_url",
      tags: {
        CourtCategory: "ProFullCourt",
        CourtType: "basketball",
      },
    };
    const designer = "Zark";
    const userId = "123456";
    const courtType = "basketball";
    const name = "Cecilia's Court";
    const imageUrl = "image_url";
    const description = "This is description";
    const selectedCourtTileData: Court[] = [];
    const selectedCourt: CourtSizeState = {
      courtId: "",
      courtName: "Pro Full Court",
      courtAreaXLength: 1,
      courtAreaYLength: 1,
      threePointLineToCourtEdgeLength: 4,
      cornerThreePointLineLength: 5,
      threePointLineRadius: 1,
      keyAreaWidth: 4,
      keyAreaHeight: 1,
      circleRadius: 9,
      strokeWidth: 1,
      borderLength: 9,
      designName: "",
      createdAt: "",
      updatedAt: "",
      image: "",
    };
    const newTemplate = generateNewTemplate(
      courtType,
      userId,
      name,
      description,
      selectedCourtTileData,
      selectedCourt,
      imageUrl,
      designer
    );
    expect(newTemplate).toEqual(mockTemplateData);
  });
});
