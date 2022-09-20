export interface IPriceCalculation {
  cementFloorPrice: number;
  tilePrices: TilePrices[];
}

export interface TilePrices {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  price: number;
  isDeleted: boolean;
}
