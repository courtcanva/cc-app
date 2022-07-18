export interface IPriceCalculation {
  _id: string;
  tilePrice: number;
  deliveryPrice: IDeliveryPrice;
  isDeleted: boolean;
}
interface IDeliveryPrice {
    tile_id: string;
    price: number;
}

