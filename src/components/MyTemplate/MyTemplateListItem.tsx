/* eslint-disable require-jsdoc */
import React, { useState, useRef } from "react";
import { Flex, Box, Button, Text, Grid, Stack, Badge, useDisclosure } from "@chakra-ui/react";
import moment from "moment";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import MyTemplateAlert from "./MyTemplateAlert";
import { useUpdateTemplateMutation } from "@/redux/api/templateApi";
import { IUpdateTemplate } from "@/interfaces/template";

function MyTemplateListItem({ ...item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const [alertHeader, setAlertHeader] = useState("");
  const [updateTemplate] = useUpdateTemplateMutation();
  const template: IUpdateTemplate = { _id: item._id };

  const handleDelete = () => {
    setAlertHeader("Delete");
    onOpen();
  };

  const handleUndisplayOrPublish = () => {
    if (item.status === "private") {
      template.status = "censoring";
      updateTemplate(template);
      return;
    }
    setAlertHeader("Undisplay");
    onOpen();
  };

  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      width="82%"
      margin="auto 120px"
      padding="1rem"
      placeItems="center"
      templateColumns="minmax(min(300px,100%), 45%) minmax(min(200px,100%), 30%)minmax(min(150px,100%), 25%)"
      rounded="2xl"
      minHeight="300px"
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
        color="#000"
      >
        <Box width="80%" height="100%" position="relative">
          <Image src={item.image} alt="Court image" layout="fill" objectFit="contain"></Image>
        </Box>
      </Flex>
      <Flex
        flexDirection="column"
        maxWidth="15rem"
        overflow="hidden"
        height="100%"
        gap="10px"
        position="relative"
      >
        <Text
          fontSize="24px"
          fontWeight={700}
          whiteSpace="pre-wrap"
          width="100%"
          color="#344C5C"
          paddingTop="1rem"
        >
          {item.courtName}
        </Text>
        <Stack direction="row">
          <Badge backgroundColor="tag.courtCategory" fontSize={{ base: "10px", lg: "12px" }}>
            {item.tags.CourtCategory}
          </Badge>
          <Badge backgroundColor="tag.courtType" fontSize={{ base: "10px", lg: "12px" }}>
            {item.tags.CourtType}
          </Badge>
        </Stack>
        <Box>
          <Text fontSize="xs" fontWeight="300" lineHeight="15px" fontStyle="italic">
            Status
          </Text>
          <Text
            marginTop="0"
            fontSize="1rem"
            lineHeight="20px"
            color={item.status === "published" ? "CourtSizecolor.btc" : "fontcolor.quaternary"}
          >
            {item.status}
          </Text>
        </Box>
        <Box>
          <Text fontSize="xs" fontWeight="300" fontStyle="italic">
            Created at
          </Text>
          <Text fontSize="1rem">{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
        </Box>
        <Text
          fontSize={{ base: "6px", md: "xs" }}
          fontWeight="400"
          marginTop="12px"
          maxWidth="180px"
        >
          {item.description}
        </Text>
      </Flex>

      <Flex gap="28px" flexDirection="column">
        <Button
          leftIcon={<MdDeleteOutline />}
          variant="deleteBtn"
          width={{ base: "60px", md: "100px", lg: "120px", xl: "180px" }}
          fontSize={{ base: "0.4rem", md: "0.6rem", lg: "1rem" }}
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          leftIcon={<MdRemoveRedEye />}
          variant="displayBtn"
          width={{ base: "60px", md: "100px", lg: "120px", xl: "180px" }}
          fontSize={{ base: "0.4rem", md: "0.6rem", lg: "1rem" }}
          onClick={handleUndisplayOrPublish}
        >
          {item.status === "private" ? "Publish" : "Undisplay"}
        </Button>
      </Flex>
      <MyTemplateAlert
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={onClose}
        alertHeader={alertHeader}
        template={template}
      />
    </Grid>
  );
}

export default MyTemplateListItem;
