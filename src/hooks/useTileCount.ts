import { useStoreSelector } from "@/store/hooks";
import { AreaTileQty } from "@/store/reducer/areaTileQtySlice";
import { changeTileQuantity, PriceBar } from "@/store/reducer/priceBarSlice";
import { Court } from "@/store/reducer/tileSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const colorAndQtyResult = (tileColorState: Court[], areaTileQty: AreaTileQty[]) => {
  let colorAndQty: PriceBar[] = [];
  for (let i = 0; i < tileColorState.length; i++) {
    const matchAreaTileQty = areaTileQty.find((obj) => obj.location === tileColorState[i].location);
    if (matchAreaTileQty) {
      const newColorAndQty = {
        color: tileColorState[i].color,
        quantity: matchAreaTileQty.quantity,
      };
      colorAndQty = [...colorAndQty, newColorAndQty];
    }
  }

  let combinedColorAndQty: PriceBar[] = [];
  for (let i = 0; i < colorAndQty.length; i++) {
    const duplicatedColor = combinedColorAndQty.findIndex(
      (obj) => obj.color === colorAndQty[i].color
    );
    if (duplicatedColor === -1) {
      combinedColorAndQty = [...combinedColorAndQty, colorAndQty[i]];
    } else {
      combinedColorAndQty[duplicatedColor].quantity += colorAndQty[i].quantity;
    }
  }
  return combinedColorAndQty;
};

export const useTileCount = () => {
  const tileColorState: Court[] = useStoreSelector((state) => state.tile.present.court);
  const areaTileQty: AreaTileQty[] = useStoreSelector((state) => state.areaTileQty);
  const dispatch = useDispatch();
  useEffect(() => {
    const tileNumberResult = colorAndQtyResult(tileColorState, areaTileQty);
    dispatch(changeTileQuantity(tileNumberResult));
  }, [tileColorState, areaTileQty]);
};
