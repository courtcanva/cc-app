/* eslint-disable require-jsdoc */
import React from "react";
import MyTemplateContainer from "./MyTemplateContainer";
import ProfileItemContainer from "../ProfileItemContainer";
import { useStoreSelector } from "@/store/hooks";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { userData } from "@/store/reducer/userSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { IMyTemplates } from "@/interfaces/template";

function MyTemplate() {
  const isMyTemplateOpen = useStoreSelector((state) => state.buttonToggle.isMyTemplateOpen);
  const currentUserId = useStoreSelector(userData).userId;
  const { data } = useGetTemplatesQuery(currentUserId ? currentUserId : skipToken);

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

  return (
    <>
      {isMyTemplateOpen && currentUserId && (
        <ProfileItemContainer>
          <MyTemplateContainer myTemplates={myTemplates} />
        </ProfileItemContainer>
      )}
    </>
  );
}

export default MyTemplate;
