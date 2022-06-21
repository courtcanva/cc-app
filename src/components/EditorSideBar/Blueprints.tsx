import courtList from "../ChangeCourtSize/CourtList";
import { Image, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { changeCourtName } from "@/store/reducer/courtNameSlice";
import React from "react";

const Blueprints: React.FC = () => {
  const dispatch = useDispatch();

  const handleCourtName = (courtSizeName: string, courtSizeDetails: string): void => {
    dispatch(changeCourtName(`${courtSizeName} ${courtSizeDetails}`));
  };

  return (
    <Box paddingLeft="24px" paddingTop="24px" height="100%" className="scrollbox">
      {courtList.map((court) => {
        const { img, courtSizeName, courtSizeDetails } = court;
        return (
          <Box
            key={img}
            width="308px"
            height="150px"
            background="#fff"
            marginBottom="18px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            onClick={() => handleCourtName(courtSizeName, courtSizeDetails)}
            data-testid={img}
          >
            <Image src={img} objectFit={"contain"} />
          </Box>
        );
      })}
    </Box>
  );
};

export default Blueprints;
