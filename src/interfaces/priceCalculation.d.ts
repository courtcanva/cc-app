export interface IPriceCalculation {
  cementFloorPrice: number;
  tilePrices: TilesPrice[];
}

export interface TilesPrice {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  price: number;
  isDeleted: boolean;
}
