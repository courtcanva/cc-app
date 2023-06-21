import { rest } from "msw";

const responseData = {
  price: [
    {
      cementFloorPrice: 15000,
      isDeleted: false,
      createdAt: new Date(),
      tilePrices: [
        {
          tile_id: "",
          tileName: "mockName",
          deliveryPrice: 1900,
          price: { singleTone: 1200, twoTone: 1500, threeTone: 2000 },
          isDeleted: false,
        },
      ],
      updatedAt: new Date(),
    },
  ],
  deposit: {
    depositRate: 0.2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

export const handlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_BASE_URI}/price`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseData.price));
  }),
  rest.get(`${process.env.NEXT_PUBLIC_API_BASE_URI}/deposit`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(responseData.deposit));
  }),
];
