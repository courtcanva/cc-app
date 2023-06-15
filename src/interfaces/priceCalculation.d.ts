export interface IPriceCalculation {
  cementFloorPrice: number;
  tilePrices: TilePrices[];
}

export interface TilePrices {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  price: { singleTone: number; twoTone: number; threeTone: number };
  isDeleted: boolean;
}

export interface ITilePrice {
  singleTone: number;
  twoTone: number;
  threeTone: number;
}
