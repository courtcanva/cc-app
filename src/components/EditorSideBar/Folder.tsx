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

//  <Flex
//             key={courtId}
//             width="230px"
//             height="160px"
//             background="white"
//             marginBottom="8px"
//             alignItems="center"
//             justifyContent="space-between"
//             cursor="pointer"
//             fontSize="12"
//             color="black"
//             flexDirection="column"
//             onClick={() => handleCourtSelecting(courtId)}
//             data-testid={courtId}
//             _hover={{ border: "2px solid button.hover" }}
//             opacity={!activateDesign || activateDesign === courtId ? "1" : "0.4"}
//           >
//             <HStack spacing={8}>
//               <Box
//                 style={{
//                   background: "none",
//                   borderRadius: "0",
//                   minWidth: "100px",
//                   marginTop: "5px",
//                 }}
//               >
//                 <Box
//                   style={{
//                     fontSize: "13px",
//                     background: "none",
//                     borderRadius: "0",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {designName}
//                 </Box>
//                 <Box
//                   style={{
//                     fontSize: "9px",
//                     color: "#2c5282",
//                     background: "none",
//                     borderRadius: "0",
//                   }}
//                 >
//                   created at {createDate}
//                 </Box>
//               </Box>
//               <Box
//                 style={{
//                   backgroundColor: "#C13D46",
//                   height: "22px",
//                   width: "22px",
//                   borderRadius: "20%",
//                   marginTop: "10px",
//                   // marginRight: "5px",
//                 }}
//               >
//                 <FolderDeleteModal />
//               </Box>
//             </HStack>
//             <Box width="80%" height="100%" position="relative">
//               {image && image.startsWith("http") && (
//                 <Image
//                   src={image.toString()}
//                   alt="Court image"
//                   layout="fill"
//                   objectFit="contain"
//                 ></Image>
//               )}
//             </Box>
//             <HStack spacing={8}>
//               <Tag
//                 // variant="courtIDTag"
//                 backgroundColor="tag.courtCategory"
//                 size={"sm"}
//                 style={{
//                   borderRadius: "0",
//                   fontSize: "9px",
//                   marginBottom: "5px",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                   padding: "0 15px 0 15px",
//                 }}
//               >
//                 {courtName}
//               </Tag>
//               <Tag
//                 // variant="courtTypeTag"
//                 backgroundColor="tag.courtType"
//                 size={"sm"}
//                 style={{
//                   borderRadius: "0",
//                   fontSize: "9px",
//                   marginBottom: "5px",
//                   padding: "0 15px 0 15px",
//                   fontWeight: "bold",
//                 }}
//               >
//                 Basketball
//               </Tag>
//             </HStack>
//           </Flex>
