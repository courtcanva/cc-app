/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateContainer from "./MyTemplateContainer";
import { Flex } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { userData } from "@/store/reducer/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { IMyTemplates } from "@/interfaces/template";

function MyTemplate() {
  const isMyTemplateOpen = useStoreSelector((state) => state.buttonToggle.isMyTemplateOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data } = useGetTemplatesQuery(currentUserId ? currentUserId : skipToken);

  const myTemplates: IMyTemplates[] | undefined = data?.data.map((item: any) => {
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

  return (
    <>
      {isMyTemplateOpen && currentUserId && (
        <Flex
          position="fixed"
          backgroundColor="#fff"
          top="72px"
          padding="20px 20px 80px 20px"
          width="100vw"
          height="100vh"
          zIndex={1600}
          gap="28px"
          overflowY="scroll"
          flexDirection="column"
          color="brand.primary"
        >
          <MyTemplateContainer myTemplates={myTemplates} />
        </Flex>
      )}
    </>
  );
}

export default MyTemplate;
