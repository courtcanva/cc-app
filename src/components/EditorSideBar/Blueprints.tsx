import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeCourtName, CourtNameState } from "@/store/reducer/courtNameSlice";
import React, { useState } from "react";
import { useGetCourtsQuery } from "../../redux/api/courtSizeApi";
import { changeCourtSize, CourtSizeState, CourtSpecMapper } from "@/store/reducer/courtSizeSlice";
import { AreaTileQty, changeCourtType } from "@/store/reducer/areaTileQtySlice";
import { mockTileData } from "../MockData/MockTileData";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");
  const { data } = useGetCourtsQuery(0); // arg 0 for satisfying arg requirement of useGetCourtsQuery

  const handleCourtSelecting = (img: string, courtId: string): void => {
    setActivateCourt(img);

    const selectedCourt = data.find((item: CourtSpecMapper) => item._id === courtId);
    const chosenCourt: CourtNameState = {
      name: `${
        ((selectedCourt.length + selectedCourt.sideBorderWidth * 2) *
          (selectedCourt.width + selectedCourt.sideBorderWidth * 2)) /
        1000000
      } m² ${selectedCourt.name} (${
        (selectedCourt.length + selectedCourt.sideBorderWidth * 2) / 1000
      } m × ${(selectedCourt.width + selectedCourt.sideBorderWidth * 2) / 1000} m)`,
      courtId: courtId,
    };
    dispatch(changeCourtName(chosenCourt));

    const mappedCourtSpecs = data.map((item: CourtSpecMapper) => ({
      courtId: item._id,
      courtAreaXLength: item.length,
      courtAreaYLength: item.width,
      threePointLineToCourtEdgeLength: item.threePointLine,
      threePointLineRadius: item.threePointRadius,
      circleRadius: item.centreCircleRadius,
      keyAreaWidth: item.restrictedAreaLength,
      keyAreaHeight: item.restrictedAreaWidth,
      borderLength: item.sideBorderWidth,
      cornerThreePointLineLength: item.lengthOfCorner,
      strokeWidth: item.lineBorderWidth,
    }));

    const courtSpec = mappedCourtSpecs.find((item: CourtSizeState) => item.courtId === courtId);
    dispatch(changeCourtSize(courtSpec));

    const tileQtyOfSelectedCourt = mockTileData.find((item) => item.id === courtId)
      ?.tileQty as AreaTileQty[];
    dispatch(changeCourtType(tileQtyOfSelectedCourt));
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { imgUrl, courtId } = court;
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
            onClick={() => handleCourtSelecting(imgUrl, courtId)}
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
