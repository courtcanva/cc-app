/* eslint-disable require-jsdoc */
import React, { useState } from "react";
import EmptyTemplate from "./EmptyTemplate";
import MyTemplateContainer from "./MyTemplateContainer";
import { Flex } from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";

function MyTemplate() {
  const isMyTemplateOpen = useStoreSelector((state) => state.buttonToggle.isMyTemplateOpen);
  return (
    <>
      {isMyTemplateOpen && (
        <Flex
          zIndex={1800}
          position="fixed"
          backgroundColor="#fff"
          top="72px"
          left="98px"
          padding="20px 20px 80px 20px"
          color="rgb(58, 75, 92)"
          width="calc(100vw - 98px)"
          height="100vh"
        >
          <MyTemplateContainer />
          {/* <EmptyTemplate /> */}
        </Flex>
      )}
    </>
  );
}

export default MyTemplate;
