export interface IPriceCalculation {
  cementFloorPrice: number;
  tilesPrice: TilesPrice[];
}

export interface TilesPrice {
  tile_id: string;
  tileName: string;
  deliveryPrice: number;
  tilePrice: number;
  isDeleted: boolean;
}
