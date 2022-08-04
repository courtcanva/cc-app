import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeTileColor } from "@/store/reducer/tileSlice";

const Folder: React.FC = () => {
  const dispatch = useDispatch();
  const { designsData, activeCourt } = useStoreSelector((state) => state.courtSpecData);

  const [activateDesign, setActivateDesign] = useState<string>(activeCourt.courtId);
  const { designTileList } = useStoreSelector((state) => state.tile.present);

  useEffect(() => {
    if (designsData === undefined) return;
    setActivateDesign(activeCourt.courtId);
  }, [designsData]);

  const handleCourtSelecting = (courtId: string): void => {
    setActivateDesign(courtId);
    dispatch(setActiveDesign(courtId));
    const selectedDesign = designsData.find((item) => item.courtId === courtId);
    if (designTileList === undefined) return;
    const selectedDesignColor = designTileList.find((item) => item.courtId === courtId);
    if (selectedDesignColor === undefined) return;
    for (const tile of selectedDesignColor.tileColor) {
      const selectedColor = tile.color;
      dispatch(changeTileColor({ selectedColor, location: tile.location }));
    }
    const tileQtyOfSelectedCourt = mockTileData.find(
      (item) => item.name === selectedDesign?.courtName
    )?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {designsData.map((design) => {
        const { courtId, courtName, designName } = design;
        return (
          <Box
            key={courtId}
            width="230px"
            height="25px"
            background="transparent"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="left"
            cursor="pointer"
            fontSize="14"
            onClick={() => handleCourtSelecting(courtId)}
            data-testid={courtId}
            _hover={{ border: "2px solid #40B484" }}
            opacity={!activateDesign || activateDesign === courtId ? "1" : "0.4"}
          >
            {designName} - {courtName}
          </Box>
        );
      })}
    </Box>
  );
};

export default Folder;
