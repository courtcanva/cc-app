import { Box, Flex, HStack, Tag, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import FolderDeleteModal from "./FolderDeleteModal";
import React from "react";
import { format, parseISO } from "date-fns";

const FolderListItem = (props: any) => {
  const { courtId, courtName, designName, createdAt, image } = props.design;
  const createDate = format(parseISO(createdAt), "dd/MM/yyyy");

  return (
    <Flex
      key={courtId}
      width="232px"
      height="160px"
      background="white"
      marginBottom="18px"
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      fontSize="12"
      color="black"
      flexDirection="column"
      onClick={() => props.handleCourtSelecting(courtId)}
      data-testid={courtId}
      _hover={{ border: "2px solid button.hover" }}
      opacity={!props.activateDesign || props.activateDesign === courtId ? "1" : "0.4"}
    >
      <HStack spacing={8}>
        <Box
          style={{
            background: "none",
            borderRadius: "0",
            minWidth: "140px",
            marginTop: "5px",
          }}
        >
          <Box
            style={{
              fontSize: "13px",
              background: "none",
              borderRadius: "0",
              fontWeight: "bold",
            }}
          >
            {designName}
          </Box>
          <Box
            style={{
              fontSize: "9px",
              color: "#2c5282",
              background: "none",
              borderRadius: "0",
            }}
          >
            created at {createDate}
          </Box>
        </Box>
        <IconButton aria-label="delete button" variant="deleteIconBtn" size="xs">
          <FolderDeleteModal />
        </IconButton>
      </HStack>
      <Box width="80%" height="100%" position="relative">
        {image && image.startsWith("http") && (
          <Image src={image.toString()} alt="Court image" layout="fill" objectFit="contain"></Image>
        )}
      </Box>
      <HStack spacing={8}>
        <Tag
          backgroundColor="tag.courtCategory"
          size={"sm"}
          style={{
            borderRadius: "0",
            fontSize: "8px",
            marginBottom: "5px",
            fontWeight: "bold",
            textAlign: "center",
            padding: "0 16px",
          }}
        >
          {courtName}
        </Tag>
        <Tag
          backgroundColor="tag.courtType"
          size={"sm"}
          style={{
            borderRadius: "0",
            fontSize: "8px",
            marginBottom: "5px",
            padding: "0 16px",
            fontWeight: "bold",
          }}
        >
          Basketball
          {/* todo: need to update interface when tennis court is added  */}
        </Tag>
      </HStack>
    </Flex>
  );
};

export default FolderListItem;
