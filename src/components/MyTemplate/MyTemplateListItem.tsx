/* eslint-disable require-jsdoc */
import React from "react";
import { Flex, Box, Button, Text, Grid, Stack, Badge } from "@chakra-ui/react";
import moment from "moment";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";

function MyTemplateListItem({ ...item }) {
  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      margin="auto 120px"
      padding="1rem"
      placeItems="center"
      templateColumns="45% 30% 25%"
      rounded="2xl"
      height="300px"
      fontWeight="700"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -4px -4px 8px #EBECF0"
      data-testid="templateListItems"
    >
      <Flex
        borderRight="2px solid #EBECF0"
        fontSize="2rem"
        fontWeight="500"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box backgroundColor="orange" width="80%" height="100%" textAlign="center">
          Img
        </Box>
      </Flex>
      <Flex flexDirection="column" maxWidth="15rem" overflow="hidden" height="100%" gap="10px">
        <Text fontSize="24px" fontWeight={700} whiteSpace="pre-wrap" width="100%" color="#344C5C">
          {item.courtName}
        </Text>
        <Stack direction="row" marginTop="00px">
          <Badge backgroundColor="#7c9fdf" fontSize="12px">
            {item.tags.CourtCategory}
          </Badge>
          <Badge backgroundColor="#E18E11" fontSize="12px">
            {item.tags.CourtType}
          </Badge>
        </Stack>
        <Box>
          <Text fontSize="xs" fontWeight="300" lineHeight="15px" fontStyle="italic">
            Status
          </Text>
          <Text
            fontSize="16px"
            lineHeight="20px"
            color={item.status === "published" ? "green" : "gray"}
          >
            {item.status}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="300" fontStyle="italic">
            Created at
          </Text>
          <Text fontSize="16px">{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
        </Box>
        <Text fontSize="xs" fontWeight="400">
          {item.description}
        </Text>
      </Flex>

      <Flex gap="1rem" flexDirection="column">
        <Button
          leftIcon={<MdDeleteOutline />}
          backgroundColor="#C13D46"
          variant="solid"
          color="white"
        >
          Delete
        </Button>
        {/* FIXME: UPDATE COLOR THEME and button color */}
        <Button
          leftIcon={<MdRemoveRedEye />}
          variant="outline"
          color="#2C4E8A"
          border="2px solid #2C4E8A"
        >
          Display
        </Button>
      </Flex>
    </Grid>
  );
}

export default MyTemplateListItem;
