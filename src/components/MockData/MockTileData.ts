import { AreaTileQty } from "@/store/reducer/areaTileQtySlice";

interface MockTileData {
  id: string;
  name: string;
  tileQty: AreaTileQty[];
}
export const mockTileData: MockTileData[] = [
  {
    id: "62c432cfb8a9c5f61f038320",
    name: "Full Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 2572,
      },
      {
        location: "threePoint",
        quantity: 1273,
      },
      {
        location: "keyArea",
        quantity: 624,
      },
      {
        location: "topKeyArea",
        quantity: 116,
      },
      {
        location: "circleArea",
        quantity: 115,
      },
      {
        location: "border",
        quantity: 0,
      },
    ],
  },
  {
    id: "62c432cfb8a9c5f61f03831f",
    name: "Pro Full Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 2572,
      },
      {
        location: "threePoint",
        quantity: 1273,
      },
      {
        location: "keyArea",
        quantity: 624,
      },
      {
        location: "topKeyArea",
        quantity: 116,
      },
      {
        location: "circleArea",
        quantity: 115,
      },
      {
        location: "border",
        quantity: 1000,
      },
    ],
  },
  {
    id: "62c432cfb8a9c5f61f038322",
    name: "Half Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 704,
      },
      {
        location: "threePoint",
        quantity: 632,
      },
      {
        location: "keyArea",
        quantity: 304,
      },
      {
        location: "topKeyArea",
        quantity: 60,
      },
      {
        location: "circleArea",
        quantity: 0,
      },
      {
        location: "border",
        quantity: 0,
      },
    ],
  },
  {
    id: "62c432cfb8a9c5f61f038321",
    name: "Pro Half Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 1295,
      },
      {
        location: "threePoint",
        quantity: 632,
      },
      {
        location: "keyArea",
        quantity: 304,
      },
      {
        location: "topKeyArea",
        quantity: 60,
      },
      {
        location: "circleArea",
        quantity: 59,
      },
      {
        location: "border",
        quantity: 0,
      },
    ],
  },
  {
    id: "62c432cfb8a9c5f61f038324",
    name: "Small Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 57,
      },
      {
        location: "threePoint",
        quantity: 71,
      },
      {
        location: "keyArea",
        quantity: 323,
      },
      {
        location: "topKeyArea",
        quantity: 59,
      },
      {
        location: "circleArea",
        quantity: 0,
      },
      {
        location: "border",
        quantity: 0,
      },
    ],
  },
  {
    id: "62c432cfb8a9c5f61f038323",
    name: "Medium Court",
    tileQty: [
      {
        location: "courtArea",
        quantity: 189,
      },
      {
        location: "threePoint",
        quantity: 263,
      },
      {
        location: "keyArea",
        quantity: 304,
      },
      {
        location: "topKeyArea",
        quantity: 60,
      },
      {
        location: "circleArea",
        quantity: 0,
      },
      {
        location: "border",
        quantity: 0,
      },
    ],
  },
];
