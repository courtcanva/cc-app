import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeCourtName } from "@/store/reducer/courtNameSlice";
import React, { useState } from "react";
import { useGetCourtsQuery } from "@/pages/api/courtSizeApi";
import { changeCourtSize, CourtSizeState } from "@/store/reducer/courtSizeSlice";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");
  const { data } = useGetCourtsQuery();

  const handleCourtSelecting = (
    courtSizeName: string,
    courtSizeDetails: string,
    img: string,
    courtId: string
  ): void => {
    setActivateCourt(img);
    dispatch(changeCourtName(`${courtSizeName} ${courtSizeDetails}`)); // change TopBar court size name

    const mappedCourtSpecs = data.map((item: any) => ({
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
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { img, courtSizeName, courtSizeDetails, courtId } = court;
        return (
          <Box
            key={img}
            width="219px"
            height="150px"
            background="#fff"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleCourtSelecting(courtSizeName, courtSizeDetails, img, courtId)}
            data-testid={img}
            _hover={{ border: "4px solid #40B484" }}
            opacity={!activateCourt || activateCourt === img ? "1" : "0.4"}
          >
            <Image src={img} objectFit={"contain"} width="200px" height="140px" />
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
