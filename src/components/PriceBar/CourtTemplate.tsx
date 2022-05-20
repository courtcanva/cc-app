import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import AddCourt from "@/assets/svg/PriceBarSvg/addcourt.svg";
import CourtIcon from "@/assets/svg/PriceBarSvg/courticon.svg";

const CourtInfo: React.FC = () => {
  const courts = [
    { id: 1, name: "Example", icon: <CourtIcon /> },
    { id: 2, name: "1", icon: <CourtIcon /> },
  ];

  const listCourts: JSX.Element[] = courts.map((court) => {
    return (
      <Box
        as="button"
        role="group"
        w="full"
        marginTop="1"
        marginRight="4"
        key={court.id}
        data-testid="courtTemplate"
      >
        <Flex flexDirection="column" align="center" justify="flex-start">
          <Icon
            width="40px"
            height="40px"
            boxShadow="0.5px 1px 3px grey"
            viewBox="0 0 20 36"
            p="2px"
            _groupHover={{ outline: "3px solid grey" }}
            color="fontcolor.primary"
            _groupActive={{ outline: "3px solid black" }}
          >
            {court.icon}
          </Icon>
          <Text
            marginTop="1"
            as="span"
            color="background.primary"
            fontSize="9px"
            fontWeight="bold"
            lineHeight="13px"
          >
            {court.name}
          </Text>
        </Flex>
      </Box>
    );
  });

  return <Box display="flex">{listCourts}</Box>;
};

const CourtTemplate: React.FC = () => {
  return (
    <>
      <Box
        display="flex"
        margin="auto"
        marginLeft="30px"
        h="64px"
        // border="1px solid red"
        justifyContent="space-between"
      >
        <CourtInfo />
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
