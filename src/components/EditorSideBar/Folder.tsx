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
import { useGetDesignByUserQuery } from "@/redux/api/designApi";

const Folder: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetDesignByUserQuery("user123");
  console.log(data);
  const [activateCourt, setActivateCourt] = useState<string>("");
  const { courtsData } = useStoreSelector((state) => state.courtSpecData);

  const handleCourtSelecting = (imgUrl: string, courtId: string, courtSizeName: string): void => {
    setActivateCourt(courtSizeName);
    dispatch(setActiveCourt(courtSizeName));
    const selectedCourt = courtsData.find((item) => item.courtName === courtSizeName);
    if (selectedCourt) {
      dispatch(changeCourtSize(selectedCourt));
      const { courtAreaXLength, courtAreaYLength, borderLength } = selectedCourt;
      const courtLength = (courtAreaXLength + borderLength * 2) / 1000;
      const courtWidth = (courtAreaYLength + borderLength * 2) / 1000;
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
            key={courtSizeName}
            width="230px"
            height="25px"
            background="transparent"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="left"
            cursor="pointer"
            onClick={() => handleCourtSelecting(imgUrl, courtId, courtSizeName)}
            data-testid={courtSizeName}
            _hover={{ border: "2px solid #40B484" }}
            opacity={!activateCourt || activateCourt === courtSizeName ? "1" : "0.4"}
          >
            {courtSizeName}
          </Box>
        );
      })}
    </Box>
  );
};

export default Folder;
