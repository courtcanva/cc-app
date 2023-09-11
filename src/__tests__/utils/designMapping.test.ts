import { designCourtMapping, designMapping, designTileMapping } from "@/utils/designMapping";

it("should return mapped data", () => {
  const design = {
    _id: "001",
    designName: "Pro Full Court",
    courtType: "basketball",
    courtSize: {
      name: "Pro Full Court",
      length: 28000,
      width: 14000,
      centreCircleRadius: 1800,
      threePointRadius: 2660,
      threePointLine: 3000,
      lengthOfCorner: 300,
      restrictedAreaLength: 4850,
      restrictedAreaWidth: 2500,
      sideBorderWidth: 200,
      lineBorderWidth: 100,
    },
    tileColor: [
      {
        location: "keyArea",
        color: "red",
      },
    ],
    user_id: "user001",
    description: "testing",
    createdAt: "2022-04-12T11:02:58.964+0000",
    updatedAt: "2022-04-12T11:02:58.964+0000",
    isDeleted: false,
    image: "",
    badgeImage: {
      badgeImageUrl: "badgeImage-url",
      width: 90,
      height: 90,
    }
  };

  const { mappedDesignsData, mappedTileData } = designMapping([design]);
  const mappedData01 = designCourtMapping(design);
  const mappedData02 = designTileMapping(design);
  expect(mappedDesignsData).toStrictEqual([mappedData01]);
  expect(mappedTileData).toStrictEqual([mappedData02]);
});
