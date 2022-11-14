import { IMyOrder } from "@/interfaces/order";
export const mockOrdersRowData: any = [
  {
    _id: "6370d83de71fd524e1c437b8",
    user_id: "6368e90574ac194077a36814",
    status: "completed",
    items: [
      {
        design: {
          designName: "Court Canva 1",
          courtSize: {
            name: "Pro Full Court",
            length: 28000,
            width: 15000,
            threePointLine: 900,
            threePointRadius: 6600,
            centreCircleRadius: 1800,
            restrictedAreaLength: 5790,
            restrictedAreaWidth: 4800,
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
          courtType: "basketball",
        },
        quotation: "67445.40",
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
        image:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/preview-image/ZeLzceibuDweTAeoDk9mQ.jpeg",
        constructionDrawing: "https://developer.mozilla.org",
      },
      {
        design: {
          designName: "Court Canva 1",
          courtSize: {
            name: "Pro Full Court",
            length: 28000,
            width: 15000,
            threePointLine: 900,
            threePointRadius: 6600,
            centreCircleRadius: 1800,
            restrictedAreaLength: 5790,
            restrictedAreaWidth: 4800,
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
          courtType: "basketball",
        },
        quotation: "67445.40",
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
        image:
          "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/preview-image/EssoCZLRV2Dv61Wq_ztpP.jpeg",
        constructionDrawing: "https://developer.mozilla.org",
      },
    ],
    depositRatio: 0.02,
    createdAt: "2022-11-13T11:42:53.539Z",
    updatedAt: "2022-11-13T11:59:24.466Z",
    __v: 0,
    paymentInfo: {
      _id: "6370dc1ce71fd524e1c43855",
      orderId: "6370d83de71fd524e1c437b8",
      name: "sdfas",
      email: "asdf@gmail.com",
      phone: "+61482145456",
      billingAddress: {
        city: "Footscray",
        country: "AU",
        line1: "2/30 Rosamond Road",
        line2: null,
        state: "VIC",
        postalCode: "3011",
      },
      constructionAddress: {
        city: "Footscray",
        country: "AU",
        line1: "2/30 Rosamond Road",
        line2: null,
        state: "VIC",
        postalCode: "3011",
      },
      currency: "aud",
      amountTotal: 269782,
      sessionId: "cs_test_b1JMBXdvKY0nlBornsx9fi71qonXJYMv6pjwzlatW0UBoWtng6sJtsrUVe",
      createdAt: "2022-11-13T11:59:24.459Z",
      updatedAt: "2022-11-13T11:59:24.459Z",
      __v: 0,
    },
  },
];

const mockOrdersData: IMyOrder[] = mockOrdersRowData.map((order: any) => {
  return {
    userId: order.user_id,
    _id: order._id,
    status: order.status,
    createdAt: order.createdAt,
    paidAt: order.paymentInfo ? order.paymentInfo.createdAt : "",
    consigneeName: order.paymentInfo ? order.paymentInfo.name : "",
    consigneePhoneNo: order.paymentInfo ? order.paymentInfo.phone : "",
    consigneeEmail: order.paymentInfo ? order.paymentInfo.email : "",
    shoppingAddressCity: order.paymentInfo ? order.paymentInfo.constructionAddress.city : "",
    shoppingAddressState: order.paymentInfo ? order.paymentInfo.constructionAddress.state : "",
    shoppingAddressCountry: order.paymentInfo ? order.paymentInfo.constructionAddress.country : "",
    shoppingAddressLine1: order.paymentInfo ? order.paymentInfo.constructionAddress.line1 : "",
    shoppingAddressLine2: order.paymentInfo ? order.paymentInfo.constructionAddress.line2 : "",
    shoppingAddressPostalCode: order.paymentInfo
      ? order.paymentInfo.constructionAddress.postalCode
      : "",
    currency: order.paymentInfo ? order.paymentInfo.currency : "aud",
    depositRatio: order.depositRatio,
    items: order.items,
  };
});

export default mockOrdersData;
