import { Tag, Flex, Box, HStack } from "@chakra-ui/react";
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
              <Box
                style={{
                  background: "none",
                  borderRadius: "0",
                  minWidth: "100px",
                  marginTop: "10px",
                  marginRight: "70px",
                }}
              >
                <Box
                  style={{
                    fontSize: "13px",
                    background: "none",
                    borderRadius: "0",
                    fontWeight: "bold",
                  }}
                >
                  {designName}
                </Box>
                <Box
                  style={{
                    fontSize: "9px",
                    color: "#2c5282",
                    background: "none",
                    borderRadius: "0",
                  }}
                >
                  created at {createDate}
                </Box>
              </Box>
              <Box
                style={{
                  backgroundColor: "#C13D46",
                  height: "25px",
                  width: "25px",
                  borderRadius: "20%",
                  marginTop: "10px",
                  marginRight: "-10px",
                }}
              >
                <FolderDeleteModal />
              </Box>
            </Flex>
            <Box style={{ color: "black" }}>image</Box>
            {/* <Flex flexDirection="row" justifyContent="space-between"> */}
            <HStack spacing={8}>
              <Tag
                // variant="courtIDTag"
                backgroundColor="tag.courtCategory"
                size={"sm"}
                style={{
                  borderRadius: "0",
                  fontSize: "8px",
                  marginBottom: "5px",
                  fontWeight: "bold",
                  textAlign: "center",
                  padding: "0 20px 0 20px",
                }}
              >
                {courtName}
              </Tag>
              <Tag
                // variant="courtTypeTag"
                backgroundColor="tag.courtType"
                size={"sm"}
                style={{
                  borderRadius: "0",
                  fontSize: "8px",
                  marginBottom: "5px",
                  padding: "0 20px 0 20px",
                  fontWeight: "bold",
                }}
              >
                Basketball
              </Tag>
            </HStack>
          </Flex>
        );
      })}
    </Box>
  );
};

export default Folder;
