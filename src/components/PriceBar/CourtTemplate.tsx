import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import AddCourt from "@/assets/svg/PriceBarSvg/addcourt.svg";
import CourtIcon from "@/assets/svg/PriceBarSvg/courticon.svg";
import CourtInfo from "./CourtInfo";
export interface CourtTemplateProps {
  courts: {
    id: string;
    name: string;
    icon: React.ReactNode;
  }[];
}

const CourtTemplate: React.FC = () => {
  const courts: CourtTemplateProps["courts"] = [
    { id: "1", name: "Example", icon: <CourtIcon /> },
    { id: "2", name: "1", icon: <CourtIcon /> },
  ];

  return (
    <>
      <Box display="flex" margin="auto" marginLeft="30px" h="64px" justifyContent="space-between">
        <CourtInfo courts={courts} />
        <Box
          as="button"
          role="group"
          w="40px"
          marginTop="5.5px"
          marginRight="4"
          height="40px"
          bg="#c7c5c5"
        >
          <Icon
            width="40px"
            height="40px"
            viewBox="0 0 50 50"
            p="13px"
            _groupHover={{ outline: "3px solid grey" }}
            color="fontcolor.primary"
            _groupActive={{ outline: "3px solid black" }}
          >
            <AddCourt data-testid="addTemplateBtn" />
          </Icon>
        </Box>
      </Box>
    </>
  );
};

export default CourtTemplate;
