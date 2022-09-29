import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveCourt } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { setCartDisplayState } from "@/store/reducer/cartControlSlice";
import { resetZoom } from "@/store/reducer/zoomCourtSlice";
import { dragState, dragSwitch } from "@/store/reducer/dragControlSlice";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");
  const { courtsData } = useStoreSelector((state) => state.courtSpecData);

  const handleCourtSelecting = (imgUrl: string, courtId: string, courtSizeName: string): void => {
    setActivateCourt(imgUrl);
    dispatch(setActiveCourt(courtSizeName));
    const selectedCourt = courtsData.find((item) => item.courtName === courtSizeName);
    const tileQtyOfSelectedCourt = mockTileData.find(
      (item) => item.name === selectedCourt?.courtName
    )?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
    dispatch(setCartDisplayState(false));
    dispatch(resetZoom());
    dispatch(dragSwitch(false));
    dispatch(dragState(false));
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { imgUrl, courtId, courtSizeName } = court;
        return (
          <Box
            key={imgUrl}
            width="219px"
            height="150px"
            background="#fff"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleCourtSelecting(imgUrl, courtId, courtSizeName)}
            data-testid={imgUrl}
            _hover={{ border: "4px solid button.hover" }}
            opacity={!activateCourt || activateCourt === imgUrl ? "1" : "0.4"}
          >
            <Image src={imgUrl} objectFit="contain" width="200px" height="140px" />
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
