import { ITestImyTemplates } from "@/interfaces/template";

export const mockTemplateDataRaw: any = [
  {
    _id: {
      $oid: "632a6741439020e45d11aa2a",
    },
    user_id: "117321211547215290439",
    design: {
      designer: "test designer",
      designName: "Small Court example",
      image: "",
      courtSize: {
        name: "Small Court",
        length: 9000,
        width: 5000,
        threePointLine: 900,
        threePointRadius: 6600,
        centreCircleRadius: 1800,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4800,
        sideBorderWidth: 0,
        lengthOfCorner: 1575,
        lineBorderWidth: 200,
      },
      tileColor: [
        {
          location: "threePoint",
          color: "#7088B1",
        },
        {
          location: "courtArea",
          color: "#E18E11",
        },
        {
          location: "topKeyArea",
          color: "#B6B6B6",
        },
        {
          location: "border",
          color: "#834085",
        },
        {
          location: "keyArea",
          color: "#2C4E8A",
        },
        {
          location: "circleArea",
          color: "#B6B6B6",
        },
      ],
    },
    image:
      "https://jr-bookinglet-2.s3.ap-southeast-2.amazonaws.com/court_canva_test/m8i7liw-KKm9Dl2OYwgi_.png",
    createdAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    status: "Published",
    description: "loreamsdhuhihuhuihu",
    tags: {
      CourtType: "SMALLCOURT",
      CourtCategory: "BASKETBALL",
    },
    isDeleted: false,
    __v: 0,
  },
  {
    _id: {
      $oid: "632a6761439020e45d11aa2d",
    },
    user_id: "117321211547215290430",
    design: {
      designer: "test designer",
      designName: "Pro Full Court example",
      image: "",
      courtSize: {
        name: "Pro Full Court",
        length: 28000,
        width: 15000,
        threePointLine: 900,
        threePointRadius: 6600,
        centreCircleRadius: 1800,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 1000,
        lengthOfCorner: 1575,
        lineBorderWidth: 200,
      },
      tileColor: [
        {
          location: "threePoint",
          color: "#7088B1",
        },
        {
          location: "courtArea",
          color: "#E18E11",
        },
        {
          location: "topKeyArea",
          color: "#B6B6B6",
        },
        {
          location: "border",
          color: "#834085",
        },
        {
          location: "keyArea",
          color: "#2C4E8A",
        },
        {
          location: "circleArea",
          color: "#B6B6B6",
        },
      ],
    },
    image:
      "https://jr-bookinglet-2.s3.ap-southeast-2.amazonaws.com/court_canva_test/m8i7liw-KKm9Dl2OYwgi_.png",
    createdAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    isDeleted: false,
    status: "Published",
    description: "loreamsdhuhihuhuihu",
    tags: {
      CourtType: "PROFULLCOURT",
      CourtCategory: "BASKETBALL",
    },
    __v: 0,
  },
  {
    _id: {
      $oid: "632a6761439020e45d11aa2e",
    },
    user_id: "117321211547215290431",
    design: {
      designer: "test designer",
      designName: "Pro Full Court example",
      image: "",
      courtSize: {
        name: "Pro Full Court",
        length: 28000,
        width: 15000,
        threePointLine: 900,
        threePointRadius: 6600,
        centreCircleRadius: 1800,
        restrictedAreaLength: 5790,
        restrictedAreaWidth: 4900,
        sideBorderWidth: 1000,
        lengthOfCorner: 1575,
        lineBorderWidth: 200,
      },
      tileColor: [
        {
          location: "threePoint",
          color: "#7088B1",
        },
        {
          location: "courtArea",
          color: "#E18E11",
        },
        {
          location: "topKeyArea",
          color: "#B6B6B6",
        },
        {
          location: "border",
          color: "#834085",
        },
        {
          location: "keyArea",
          color: "#2C4E8A",
        },
        {
          location: "circleArea",
          color: "#B6B6B6",
        },
      ],
    },
    image:
      "https://jr-bookinglet-2.s3.ap-southeast-2.amazonaws.com/court_canva_test/m8i7liw-KKm9Dl2OYwgi_.png",
    createdAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1663723361318",
      },
    },
    status: "Published",
    description: "lorea msdhuhi huhu ihu",
    tags: {
      CourtType: "PROFULLCOURT",
      CourtCategory: "BASKETBALL",
    },
    isDeleted: false,
    __v: 0,
  },
];

export const mockTemplateData: ITestImyTemplates[] = mockTemplateDataRaw.map((item: any) => {
  return {
    _id: item._id,
    courtName: item.design.designName,
    user_id: item.user_id,
    description: item.description,
    image: item.image,
    status: item.status,
    createdAt: item.createdAt,
    tags: item.tags,
    design: item.design,
  };
});
