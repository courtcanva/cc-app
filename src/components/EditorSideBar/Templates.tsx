import { LIMIT } from "@/constants/templateItemPagination";
import { ITemplateDataDb, ITemplateLists, ITemplateObj } from "@/interfaces/template";
import { Box, Text } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import TemplateItem from "../TemplateList/TemplateItem";

export interface Props {
  offset: number;
  templatesData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
  isLoading: boolean;
  hasNextPage: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}

const Templates = ({
  offset,
  templatesData,
  isLoading,
  hasNextPage,
  setOffset,
  setPageNum,
}: Props) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastTemplateRef = useCallback(
    (template) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver((templatesData) => {
        if (templatesData[0].isIntersecting && hasNextPage) {
          console.log("We are near the last template!");
          setPageNum((prev) => prev + 1);
          setOffset((prev) => prev + LIMIT);
        }
      });

      if (template) intObserver.current?.observe(template);
    },
    [isLoading, hasNextPage]
  );

  const templateEmpty = templatesData?.length === 0;

  return (
    <Box height="100%" className="scrollbox">
      {templatesData?.map((template, index) => {
        if (templatesData?.length === index + 1) {
          return <TemplateItem key={template._id} template={template} ref={lastTemplateRef} />;
        }
        return <TemplateItem key={template._id} template={template} />;
      })}
      {templateEmpty && <Text>The template list is empty</Text>}
      {isLoading && <Text>Template is loading</Text>}
    </Box>
  );
};
export default Templates;
