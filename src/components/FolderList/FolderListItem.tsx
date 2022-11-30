import { Box, Flex, HStack, Tag, IconButton, Text } from "@chakra-ui/react";
import Image from "next/image";
import FolderDeleteModal from "./FolderDeleteModal";
import React from "react";
import { format, parseISO } from "date-fns";

const FolderListItem = (props: any) => {
  const { courtId, courtName, designName, createdAt, image, courtType } = props.design;
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
      flexDirection="column"
      onClick={() => props.handleCourtSelecting(courtId)}
      data-testid={courtId}
      _hover={{ border: "2px solid button.hover" }}
      opacity={!props.activateDesign || props.activateDesign === courtId ? "1" : "0.4"}
    >
      <HStack spacing={8}>
        <Box
          style={{
            minWidth: "140px",
            marginTop: "5px",
          }}
        >
          <Text variant="textFont">{designName}</Text>
          <Text variant="dateFont">created at {createDate}</Text>
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
      <HStack spacing={8} style={{ margin: "4px" }}>
        <Tag size="sm" variant="courtName">
          {courtName.replace(/ /g, "")}
        </Tag>
        <Tag size="sm" variant="courtType">
          BASKETBALL
          {/* todo: need to update interface when tennis court is added  */}
        </Tag>
      </HStack>
    </Flex>
  );
};

export default FolderListItem;
