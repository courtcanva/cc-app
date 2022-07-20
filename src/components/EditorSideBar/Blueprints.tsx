import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeCourtName, CourtNameState } from "@/store/reducer/courtNameSlice";
import React, { useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveCourt } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeCourtSize } from "@/store/reducer/courtSizeSlice";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");
  const { courtsData } = useStoreSelector((state) => state.courtSpecData);

  const handleCourtSelecting = (imgUrl: string, courtId: string, courtSizeName: string): void => {
    setActivateCourt(imgUrl);
    dispatch(setActiveCourt(courtSizeName));
    const selectedCourt = courtsData.find((item) => item.courtName === courtSizeName);
    if (selectedCourt) {
      dispatch(changeCourtSize(selectedCourt));
      const { courtAreaXLength, courtAreaYLength, borderLength} = selectedCourt;
      const courtLength = (courtAreaXLength + borderLength * 2)/1000;
      const courtWidth = (courtAreaYLength + borderLength * 2)/1000;
      const chosenCourt: CourtNameState = {
        name: `{${courtLength} * ${courtWidth}} m² ${selectedCourt.courtName} ( ${courtLength} m × ${courtWidth} m)`,
        courtId: courtId,
      };
      dispatch(changeCourtName(chosenCourt));
    }

    const tileQtyOfSelectedCourt = mockTileData.find(
      (item) => item.name === selectedCourt?.courtName
    )?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
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
            _hover={{ border: "4px solid #40B484" }}
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
