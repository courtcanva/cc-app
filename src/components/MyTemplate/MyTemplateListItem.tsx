/* eslint-disable require-jsdoc */
import React, { useState } from "react";
import { Flex, Box, Button, Text, Grid, Stack, Tag, useDisclosure } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { MdDeleteOutline, MdRemoveRedEye } from "react-icons/md";
import Image from "next/image";
import { useUpdateTemplateMutation, useDeleteTemplateMutation } from "@/redux/api/templateApi";
import { IUpdateTemplate } from "@/interfaces/template";
import ConfirmModal from "../ComfirmModal";

function MyTemplateListItem({ ...item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonClicked, setButtonClicked] = useState("");
  const [updateTemplate] = useUpdateTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();
  const isPrivate = item.status === "private";
  const template: IUpdateTemplate = { _id: item._id };
  template.status = isPrivate ? "censoring" : "private";

  const alertObj = {
    Delete: { text: "permanently delete", action: () => deleteTemplate(template._id) },
    Undisplay: {
      text: "undisplay",
      action: () => updateTemplate(template),
    },
    Publish: {
      text: "publish",
      action: () => updateTemplate(template),
    },
  };

  type ObjectKey = keyof typeof alertObj;
  const button = buttonClicked as ObjectKey;
  const alertText = `${alertObj[button]?.text} your template`;

  const handleDelete = () => {
    setButtonClicked("Delete");
    onOpen();
  };

  const handleUndisplayOrPublish = () => {
    setButtonClicked(isPrivate ? "Publish" : "Undisplay");
    onOpen();
  };

  const handleModalConfirm = () => {
    alertObj[button].action();
    onClose();
  };

  return (
    <Grid
      justifyContent="space-around"
      alignItems="center"
      width="82%"
      margin="auto 120px"
      padding="1rem"
      placeItems="center"
      templateColumns="minmax(min(300px,100%), 45%) minmax(min(200px,100%), 30%) minmax(min(150px,100%), 25%)"
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
          <Image
            src={item.image}
            alt="Court image"
            layout="fill"
            objectFit="contain"
            placeholder="blur"
            blurDataURL="https://cdn-images-1.medium.com/max/1800/1*sg-uLNm73whmdOgKlrQdZA.jpeg"
          ></Image>
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
        <Text variant="bodyFont" whiteSpace="pre-wrap" paddingTop="1rem">
          {item.courtName}
        </Text>
        <Stack direction="row">
          <Tag size="sm" variant="courtName">
            {item.tags.CourtCategory}
          </Tag>
          <Tag size="sm" variant="courtType">
            {item.tags.CourtType.toUpperCase()}
          </Tag>
        </Stack>
        <Box>
          <Text variant="textFont" fontWeight="300" lineHeight="15px" fontStyle="italic">
            Status
          </Text>
          <Text
            variant="textFont"
            color={item.status === "published" ? "CourtSizecolor.btc" : "fontcolor.quaternary"}
          >
            {item.status}
          </Text>
        </Box>
        <Box>
          <Text variant="textFont" fontWeight="300" fontStyle="italic">
            Created at
          </Text>
          <Text variant="textFont">{format(parseISO(item.createdAt), "dd/MM/yyyy")}</Text>
        </Box>
        <Text variant="textFont" fontWeight="400" maxWidth="180px">
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
          {isPrivate ? "Publish" : "Undisplay"}
        </Button>
      </Flex>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleModalConfirm}
        buttonText={buttonClicked}
        alertText={alertText}
      />
    </Grid>
  );
}

export default MyTemplateListItem;
