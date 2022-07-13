export interface IPriceCalculation {
  _id: string;
  tiles: ITiles
  court_spec: Array<ICourts>;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
interface ITiles {
    tile_id: string;
    deliveryPrice: number;
    tilePrice: Array<ITilePrice>;
}
export interface ITilePrice {
  color: string;
  price: number;
}
export interface ICourts {
  court: string;
  installationPrice: number;
}
