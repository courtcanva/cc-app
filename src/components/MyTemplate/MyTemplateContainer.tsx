/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { Flex, Button } from "@chakra-ui/react";
import { IMyTemplates } from "@/interfaces/template";
import { useDispatch } from "react-redux";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

interface myTemplates {
  myTemplates: IMyTemplates[] | undefined;
}

export default function MyTemplateContainer({ myTemplates }: myTemplates) {
  const disPatch = useDispatch();
  // FIXME: import as a utility
  const handleReturnToDesign = () => {
    disPatch(switchMyTemplateDisplay(false));
  };
  return (
    <Flex flexDirection="column" width="100vw" gap="20px" overflowY="scroll">
      {myTemplates
        ?.sort((itema, itemb) => +itemb.createdAt - +itema.createdAt)
        .map((item) => (
          <MyTemplateListItem key={item._id} {...item} />
        ))}
      <Button
        aria-label="ReturnHomeBtn"
        variant="shareBtn"
        size="lg"
        padding="10px 20px"
        onClick={handleReturnToDesign}
      >
        RETURN TO DESIGN
      </Button>
    </Flex>
  );
}
