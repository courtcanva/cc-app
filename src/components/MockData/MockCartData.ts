import { ICartItem } from "@/interfaces/cartItem";

export const mockCartDataRaw: any = [
  {
    _id: {
      $oid: "632a6741439020e45d11aa2a",
    },
    quotation: "0.00",
    quotationDetails: [
      {
        color: "#7088B1",
        quantity: 71,
      },
      {
        color: "#E18E11",
        quantity: 57,
      },
      {
        color: "#B6B6B6",
        quantity: 59,
      },
      {
        color: "#834085",
        quantity: 0,
      },
      {
        color: "#2C4E8A",
        quantity: 323,
      },
    ],
    isExpired: true,
    user_id: "117321211547215290439",
    design: {
      designName: "Small Court example",
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
        $numberLong: "1663723329368",
      },
    },
    updatedAt: {
      $date: {
        $numberLong: "1663723329368",
      },
    },
    isDeleted: false,
    __v: 0,
  },
  {
    _id: {
      $oid: "632a6761439020e45d11aa2d",
    },
    quotation: "0.00",
    quotationDetails: [
      {
        color: "#7088B1",
        quantity: 1273,
      },
      {
        color: "#E18E11",
        quantity: 2572,
      },
      {
        color: "#B6B6B6",
        quantity: 231,
      },
      {
        color: "#834085",
        quantity: 1000,
      },
      {
        color: "#2C4E8A",
        quantity: 624,
      },
    ],
    isExpired: false,
    user_id: "117321211547215290430",
    design: {
      designName: "Pro Full Court example",
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
    __v: 0,
  },
  {
    _id: {
      $oid: "632a6761439020e45d11aa2e",
    },
    quotation: "0.00",
    quotationDetails: [
      {
        color: "#7088B1",
        quantity: 1273,
      },
      {
        color: "#E18E11",
        quantity: 2572,
      },
      {
        color: "#B6B6B6",
        quantity: 231,
      },
      {
        color: "#834085",
        quantity: 1000,
      },
      {
        color: "#2C4E8A",
        quantity: 624,
      },
    ],
    isExpired: false,
    user_id: "117321211547215290431",
    design: {
      designName: "Pro Full Court example",
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
    __v: 0,
  },
];

export const mockCartData: ICartItem[] = mockCartDataRaw.map((cartItem: any) => {
  return {
    id: cartItem._id,
    user_id: cartItem.user_id,
    design: cartItem.design,
    quotation: cartItem.quotation,
    quotationDetails: cartItem.quotationDetails,
    image: cartItem.image,
    isExpired: cartItem.isExpired,
  };
});
