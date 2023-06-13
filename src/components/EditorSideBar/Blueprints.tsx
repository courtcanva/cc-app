import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { setActiveCourt } from "@/store/reducer/courtSpecDataSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { ICourtData } from "@/interfaces/design";

interface Props {
  fetchedCourtsData: ICourtData[] | undefined;
}

const Blueprints = ({ fetchedCourtsData }: Props) => {
  const dispatch = useDispatch();
  const [activateCourt, setActivateCourt] = useState<string>("");

  const filteredCourtList = courtList.filter((court) =>
    fetchedCourtsData?.some((item: ICourtData) => item.name === court.courtSizeName)
  );
  const handleCourtSelecting = (imgUrl: string, courtId: string, courtSizeName: string): void => {
    setActivateCourt(imgUrl);
    dispatch(setActiveCourt(courtSizeName));
    dispatch(resetAll());
  };

  return (
    <Box height="100%" className="scrollbox">
      {filteredCourtList.map((court) => {
        const { imgUrl, courtId, courtSizeName } = court;
        return (
          <Box
            key={imgUrl}
            flexDirection="column"
            width="232px"
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
