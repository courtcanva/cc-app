import courtList from "../ChangeCourtSize/CourtList";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { getCourtSpecData, setActiveDesign } from "@/store/reducer/courtSpecDataSlice";
import { mockTileData } from "../MockData/MockTileData";
import { useStoreSelector } from "@/store/hooks";
import { changeCourtSize, CourtSizeState, CourtSpecMapper } from "@/store/reducer/courtSizeSlice";
import { useGetDesignByUserQuery } from "@/redux/api/designApi";
import { courtSpecMapping } from "@/utils/courtSpecMapping";

const Folder: React.FC = () => {
  const dispatch = useDispatch();
  const { data, isError } = useGetDesignByUserQuery("user123");
  // console.log(data);
  const [activateDesign, setActivateDesign] = useState<string>("");
  const { courtsData } = useStoreSelector((state) => state.courtSpecData);
  useEffect(() => {
    if (data === undefined) return;
    const mappedCourtData = data.courtSize?.map((item: CourtSpecMapper) => courtSpecMapping(item));
    console.log(mappedCourtData);
    // dispatch(getCourtSpecData(mappedCourtData));
    // const initailCourtIndex = mappedCourtData.findIndex(
    //   (item: CourtSizeState) => item.courtName === "Pro Full Court"
    // );
    // dispatch(changeCourtSize(mappedCourtData[initailCourtIndex]));
    // // (isLoading) ? (dispatch(setLoading(true))) : (dispatch(setLoading(false)));
  }, [data]);

  // const handleCourtSelecting = (designId: string, courtSizeName: string): void => {
  //   setActivateDesign(designId);
  //   dispatch(setActiveDesign(designId));
  //   const selectedCourt = courtsData.find((item) => item.courtName === courtSizeName);
  //   if (selectedCourt) {
  //     dispatch(changeCourtSize(selectedCourt));
  //   }

  //   const tileQtyOfSelectedCourt = mockTileData.find(
  //     (item) => item.name === selectedCourt?.courtName
  //   )?.tileQty as AreaTileQty[];
  //   dispatch(changeCourtType(tileQtyOfSelectedCourt));
  // };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { courtId, courtSizeName } = court;
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
            // onClick={() => handleCourtSelecting(courtId, courtSizeName)}
            data-testid={courtSizeName}
            _hover={{ border: "2px solid #40B484" }}
            opacity={!activateDesign || activateDesign === courtSizeName ? "1" : "0.4"}
          >
            {courtSizeName}
          </Box>
        );
      })}
    </Box>
  );
};

export default Folder;
