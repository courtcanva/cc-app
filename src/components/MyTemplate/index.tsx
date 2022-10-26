/* eslint-disable require-jsdoc */
import React from "react";
import EmptyTemplate from "./EmptyTemplate";
import MyTemplateContainer from "./MyTemplateContainer";
import { Flex, Button, Text } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { userData } from "@/store/reducer/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { IMyTemplates } from "@/interfaces/template";
import { useDispatch } from "react-redux";
import { switchMyTemplateDisplay } from "@/store/reducer/buttonToggleSlice";

function MyTemplate() {
  const isMyTemplateOpen = useStoreSelector((state) => state.buttonToggle.isMyTemplateOpen);
  const isCreateTemplateOpen = useStoreSelector((state) => state.buttonToggle.isCreateTemplateOpen);
  const isCartOpen = useStoreSelector((state) => state.buttonToggle.isCartOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data } = useGetTemplatesQuery(currentUserId ? currentUserId : skipToken);
  const quantity = data?.length;

  const myTemplates: IMyTemplates[] | undefined = data?.map((item: any) => {
    return {
      _id: item._id,
      courtName: item.design.designName,
      user_id: item.user_id,
      description: item.description,
      image: item.image,
      status: item.status,
      createdAt: item.createdAt,
      tags: item.tags,
    };
  });

  const disPatch = useDispatch();
  const handleReturnToDesign = () => {
    disPatch(switchMyTemplateDisplay(false));
  };
  return (
    <>
      {isMyTemplateOpen && currentUserId && !isCreateTemplateOpen && !isCartOpen && (
        <Flex
          position="fixed"
          backgroundColor="#fff"
          top="72px"
          padding="20px 20px 80px 20px"
          color="rgb(58, 75, 92)"
          width="calc(100vw)"
          height="100vh"
          zIndex={1600}
          gap="28px"
          overflowY="scroll"
          flexDirection="column"
          alignItems="center"
        >
          {(quantity as number) > 0 && <MyTemplateContainer myTemplates={myTemplates} />}
          {quantity === 0 && <EmptyTemplate />}
          <EmptyTemplate />
          <Button
            variant="shareBtn"
            size="lg"
            padding="10px 24px"
            borderRadius="6px"
            onClick={handleReturnToDesign}
            data-testid="return"
          >
            Return To Design
          </Button>
        </Flex>
      )}
    </>
  );
}

export default MyTemplate;
