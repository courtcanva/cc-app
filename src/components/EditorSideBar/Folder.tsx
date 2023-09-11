import { Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { useStoreSelector } from "@/store/hooks";
import { changeWholeCourtColor } from "@/store/reducer/tileSlice";
import { ActionCreators } from "redux-undo";
import FolderListItem from "../FolderList/FolderListItem";
import { resetBadgeImage, setBadgeImage } from "@/store/reducer/badgeSlice";

const Folder: React.FC = () => {
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
    if (designTileList === undefined) return;
    const selectedDesignColor = designTileList.find((item) => item.courtId === courtId);
    if (selectedDesignColor === undefined) return;
    dispatch(changeWholeCourtColor(selectedDesignColor.tileColor));
    const selectedDesignData = designsData.find((item) => item.courtId === courtId);
    if (selectedDesignData?.badgeImage?.badgeImageUrl) {
      dispatch(setBadgeImage(selectedDesignData.badgeImage));
    } else {
      dispatch(resetBadgeImage());
    }
    dispatch(ActionCreators.clearHistory());
  };
  const folderEmpty = designsData?.length === 0;

  return (
    <Box height="100%" className="scrollbox">
      {designsData.map((design) => {
        return (
          <FolderListItem
            key={design.courtId}
            design={design}
            handleCourtSelecting={handleCourtSelecting}
            activateDesign={activateDesign}
          />
        );
      })}
      {folderEmpty && (
        <Box textAlign="center" width={232} marginTop={8}>
          <Text>The folder list is empty</Text>
        </Box>
      )}
    </Box>
  );
};

export default Folder;
