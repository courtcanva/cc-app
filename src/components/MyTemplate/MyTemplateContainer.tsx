/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { Flex, Text, Button } from "@chakra-ui/react";
import { IMyTemplates } from "@/interfaces/template";
import { useDispatch } from "react-redux";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

interface myTemplates {
  myTemplates: IMyTemplates[] | undefined;
}

export default function MyTemplateContainer({ myTemplates }: myTemplates) {
  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    disPatch(switchMyTemplateDisplay(false));
  };
  const myTemplateLists = (): JSX.Element[] | undefined => {
    return myTemplates
      ?.sort((itemA, itemB) => +itemB.createdAt - +itemA.createdAt)
      .map((item) => <MyTemplateListItem key={item._id} {...item} />);
  };

  return (
    <Flex flexDirection="column" width="1440px" gap="28px" position="relative" alignItems="center">
      <Text fontSize="32px" fontWeight="700" textAlign="center">
        My Template
      </Text>
      {myTemplateLists()}
      <Button
        variant="shareBtn"
        size="lg"
        padding="10px 24px"
        onClick={handleReturnToDesign}
        marginBottom="28px"
      >
        RETURN TO DESIGN
      </Button>
    </Flex>
  );
}
