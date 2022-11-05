import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeWholeCourtColor } from "@/store/reducer/tileSlice";
import { ActionCreators } from "redux-undo";
import FolderListItem from "../FolderList/FolderListItems";

const Folder = () => {
  const dispatch = useDispatch();
  const { designsData, activeCourt } = useStoreSelector((state) => state.courtSpecData);
  const [activateDesign, setActivateDesign] = useState<string>(activeCourt.courtId);
  const { designTileList } = useStoreSelector((state) => state.designTileList);

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
    dispatch(changeWholeCourtColor(selectedDesignColor.tileColor));
    dispatch(ActionCreators.clearHistory());
    const tileQtyOfSelectedCourt = mockTileData.find(
      (item) => item.name === selectedDesign?.courtName
    )?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
  };

  return (
    <Box height="100%" className="scrollbox">
      {designsData.map((design) => {
        return (
          <FolderListItem
            key={design.courtId}
            design={design}
            handleCourtSelecting={handleCourtSelecting}
          />
        );
      })}
    </Box>
  );
};

export default Folder;
