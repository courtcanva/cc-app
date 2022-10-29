/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateListItem from "./MyTemplateListItem";
import { Flex, Text, Button } from "@chakra-ui/react";
import { IMyTemplates } from "@/interfaces/template";
import { useDispatch } from "react-redux";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

interface MyTemplates {
  myTemplates: IMyTemplates[] | undefined;
}

export default function MyTemplateContainer({ myTemplates }: MyTemplates) {
  const dispatch = useDispatch();
  const handleReturnToDesign = () => {
    dispatch(switchMyTemplateDisplay(false));
  };
  const myTemplateLists = (): JSX.Element[] | undefined => {
    return myTemplates?.map((item) => <MyTemplateListItem key={item._id} {...item} />);
  };

  return (
    <Flex flexDirection="column" width="100vw" gap="28px" alignItems="center" min-height="100vh">
      <Text fontSize="32px" fontWeight="700" textAlign="center">
        My Template
      </Text>
      {myTemplates ? (
        myTemplateLists()
      ) : (
        <Text fontSize="lg" fontWeight="500" color="black" data-testid="emptyText">
          You currently have{" "}
          <Text display="inline" fontWeight="900">
            no items{" "}
          </Text>
          in your Template
        </Text>
      )}
      <Button
        variant="shareBtn"
        size="lg"
        padding="10px 24px"
        onClick={handleReturnToDesign}
        marginBottom="28px"
      >
        Return To Design
      </Button>
    </Flex>
  );
}
