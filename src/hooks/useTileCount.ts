import { useStoreSelector } from "@/store/hooks";
import { AreaTileQty } from "@/store/reducer/areaTileQtySlice";
import { changeTileQuantity, PriceBar } from "@/store/reducer/priceBarSlice";
import { Court } from "@/store/reducer/tileSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const colorAndQtyResult = (tileColorState: Court[], areaTileQty: AreaTileQty[]) => {
  let colorAndQty: PriceBar[] = [];
  // mapping over tileColorState and match with areaTileQty
  // to obtain colorAndQty as [{color:"#72818B",quantity:1273},...] color is not unique
  tileColorState.map((tileColor) => {
    const matchAreaTileQty = areaTileQty.find((area) => area.location === tileColor.location);
    if (matchAreaTileQty) {
      const newColorAndQty = {
        color: tileColor.color,
        quantity: matchAreaTileQty.quantity,
      };
      colorAndQty = [...colorAndQty, newColorAndQty];
    }
  });

  let combinedColorAndQty: PriceBar[] = [];
  // mapping over colorAndQty to remove replicate color and combine the quantity result
  colorAndQty.map((result) => {
    const duplicatedColor = combinedColorAndQty.findIndex((obj) => obj.color === result.color);
    if (duplicatedColor === -1) {
      combinedColorAndQty = [...combinedColorAndQty, result];
    } else {
      combinedColorAndQty[duplicatedColor].quantity += result.quantity;
    }
  });

  return combinedColorAndQty;
};

export const useTileCount = () => {
  // tileColorState = [{location:"threePoint", color:"#72818B"},...]
  const tileColorState: Court[] = useStoreSelector((state) => state.tile.present.court);
  // areaTileQty = [{location:"threePoint",quantity:1273}...]
  const areaTileQty: AreaTileQty[] = useStoreSelector((state) => state.areaTileQty);
  const dispatch = useDispatch();
  useEffect(() => {
    const tileNumberResult = colorAndQtyResult(tileColorState, areaTileQty);
    dispatch(changeTileQuantity(tileNumberResult));
  }, [tileColorState, areaTileQty]);
};
