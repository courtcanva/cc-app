import { LIMIT } from "@/constants/templateItemPagination";
import { ITemplateDataDb, ITemplateLists, ITemplateObj } from "@/interfaces/template";
import { Box, Select, Text } from "@chakra-ui/react";
import { useCallback, useRef, useState } from "react";
import TemplateItem from "../TemplateList/TemplateItem";

export interface Props {
  offset: number;
  templatesData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
  isLoading: boolean;
  hasNextPage: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
  setTemplatesData: React.Dispatch<
    React.SetStateAction<Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined>
  >;
  newData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
  isSuccess: boolean;
  filterTag: string;
}

const Templates = ({
  offset,
  templatesData,
  isLoading,
  hasNextPage,
  setOffset,
  setPageNum,
  setFilterTag,
  setTemplatesData,
  newData,
  isSuccess,
  filterTag,
}: //
Props) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastTemplateRef = useCallback(
    (template) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current?.disconnect();

      intObserver.current = new IntersectionObserver((templatesData) => {
        if (templatesData[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
          setOffset((prev) => prev + LIMIT);
        }
      });

      if (template) intObserver.current?.observe(template);
    },
    [isLoading, hasNextPage]
  );

  const limit = LIMIT;

  const handleOnChange = (e: { target: { value: string } }) => {
    setFilterTag(e.target.value);
    // console.log(e.target.value);
    // if (isSuccess) {
    //   setTemplatesData(newData);
    //   console.log(templatesData);
    //   console.log(newData);
    // }
    // NEED TO OPTIMIZE LOGIC
  };
  const templateEmpty = templatesData?.length === 0;

  return (
    <Box height="100%" className="scrollbox">
      <Select placeholder="Court Category" onChange={handleOnChange} value={filterTag}>
        <option value="ProFullCourt">Pro Full Court</option>
        <option value="FullCourt">Full Court</option>
        {/* <option value="option3">Option 3</option> */}
      </Select>
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
