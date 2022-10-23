import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveCourt } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { resetAll } from "@/store/reducer/canvasControlSlice";

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
    dispatch(resetAll());
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { imgUrl, courtId, courtSizeName } = court;
        return (
          <Box
            key={imgUrl}
            flexDirection="column"
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
            {courtSizeName === "Pro Half Court" && (
              <Text height={2} position="relative" color="red" fontWeight="bold">
                Customize
              </Text>
            )}
            <Image src={imgUrl} objectFit="contain" width="200px" height="140px"></Image>
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
