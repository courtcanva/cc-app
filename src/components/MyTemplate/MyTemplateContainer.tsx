/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { Flex } from "@chakra-ui/react";
import { IMyTemplates } from "@/interfaces/template";

interface myTemplates {
  myTemplates: IMyTemplates[] | undefined;
}

export default function MyTemplateContainer({ myTemplates }: myTemplates) {
  const myTemplateLists = (): JSX.Element[] | undefined => {
    return myTemplates
      ?.sort((itemA, itemB) => +itemB.createdAt - +itemA.createdAt)
      .map((item) => <MyTemplateListItem key={item._id} {...item} />);
  };

  console.log(myTemplates);
  return (
    <Flex flexDirection="column" width="98vw" gap="20px" position="relative">
      {myTemplateLists()}
    </Flex>
  );
}
