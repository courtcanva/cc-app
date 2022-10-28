import { Tag, Flex, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeWholeCourtColor } from "@/store/reducer/tileSlice";
import { ActionCreators } from "redux-undo";
import FolderDeleteModal from "./Folder/FolderDeleteModal";
import Image from "next/image";
import { upLoadScreenshot } from "@/utils/manageExternalImage";

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
        const { courtId, courtName, designName, createdAt } = design;
        const createDate = [
          createdAt.slice(8, 10),
          createdAt.slice(5, 7),
          createdAt.slice(0, 4),
        ].join("/");

        // list
        return (
          <Flex
            key={courtId}
            width="230px"
            height="160px"
            background="white"
            marginBottom="8px"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            fontSize="12"
            color="black"
            flexDirection="column"
            onClick={() => handleCourtSelecting(courtId)}
            data-testid={courtId}
            _hover={{ border: "2px solid button.hover" }}
            opacity={!activateDesign || activateDesign === courtId ? "1" : "0.4"}
          >
            <Flex flexDirection="row" alignItems="flex-start" justifyContent="space-between">
              <Tag>
                {designName}
                <br />
                created at {createDate}
              </Tag>
              <Box
                style={{
                  backgroundColor: "#C13D46",
                  height: "25px",
                  width: "25px",
                  borderRadius: "20%",
                  margin: "5px",
                }}
              >
                <FolderDeleteModal />
              </Box>
            </Flex>
            <Box style={{ color: "black" }}>image</Box>
            <Flex flexDirection="row" justifyContent="space-between">
              <Tag
              // variant="courtIDTag"
              >
                {courtName}
              </Tag>
              <Tag
              // variant="courtTypeTag"
              >
                Basketball
              </Tag>
            </Flex>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Folder;
