import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import { CourtTemplateProps } from "./CourtTemplate";
import React from "react";

const CourtInfo: React.FC<CourtTemplateProps> = ({ courts }) => {
  return (
    <Box display="flex">
      {courts.map((court) => {
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
      })}
    </Box>
  );
};

export default CourtInfo;
