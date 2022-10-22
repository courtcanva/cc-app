import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { Flex } from "@chakra-ui/react";

export default function MyTemplateContainer() {
  return (
    <Flex flexDirection="column" width="100vw" gap="10px">
      <MyTemplateListItem />
      <MyTemplateListItem />
    </Flex>
  );
}
