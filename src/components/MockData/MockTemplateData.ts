import { ICourtSize, ISaveDesign, ITileColor } from "@/interfaces/design";
import { ITemplateDataDb } from "@/interfaces/template";

const mockCourtSize: ICourtSize = {
  centreCircleRadius: 1800,
  length: 14000,
  lengthOfCorner: 1575,
  lineBorderWidth: 200,
  name: "Pro Half Court",
  restrictedAreaLength: 5790,
  restrictedAreaWidth: 4800,
  sideBorderWidth: 2000,
  threePointLine: 900,
  threePointRadius: 6600,
  width: 15000,
};

const mockTileColor: ITileColor[] = [
  { location: "threePoint", color: "#7088B1" },
  { location: "courtArea", color: "#E18E11" },
  { location: "topKeyArea", color: "#B6B6B6" },
  { location: "border", color: "#834085" },
  { location: "keyArea", color: "#2C4E8A" },
  { location: "circleArea", color: "#B6B6B6" },
];

const mockDesign: ISaveDesign = {
  designer: "Test designer",
  user_id: "123456",
  designName: "Mock design",
  tileColor: mockTileColor,
  courtSize: mockCourtSize,
};

export const mockTemplate: Omit<ITemplateDataDb, "__v" | "isDeleted">[] = [
  {
    _id: "000",
    user_id: "000",
    description: "Test description",
    design: mockDesign,
    image:
      "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/preview-image/v2KnpuxNHTItF_50L1lRo.png",
    tags: { CourtCategory: "ProHalfCourt", CourtType: "basketball" },
    createdAt: "2022-01-01",
    updatedAt: "2022-01-01",
    status: "published",
    isOfficial: false,
  },
];
