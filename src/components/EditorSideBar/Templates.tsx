import { LIMIT } from "@/constants/templateItemPagination";
import { ITemplateDataDb, ITemplateLists, ITemplateObj } from "@/interfaces/template";
import { useGetTemplateListsQuery } from "@/redux/api/templateApi";
import { Box, Select, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
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

const Templates = () => {
  const [offset, setOffset] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const [templatesData, setTemplatesData] = useState<any>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("");
  const limit = LIMIT;
  const {
    data: rawTemplateData,
    isLoading,
    isSuccess,
  } = useGetTemplateListsQuery({ offset, limit, filterTag });

  const newData: any = rawTemplateData?.data;
  // if (isSuccess) console.log(newData);
  if (isSuccess) {
    console.log(filterTag);
    console.log(templatesData);
  }

  useEffect(() => {
    // if (filterTag) {
    //   setTemplatesData(newData);
    // }
    if (isSuccess) {
      console.log(filterTag);
      setTemplatesData((prev: any) => [...prev, ...newData]);
      setHasNextPage(Boolean(newData.length));
      console.log("useEffect  渲染了");
    }

    // if (isSuccess && filterTag) {
    //   setTemplatesData(newData);
    //   setHasNextPage(Boolean(newData.length));
    // }
  }, [filterTag, isSuccess]);
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

  // BUG: 1、页面刚加载时，切换成fullCourt 页面没有任何变化 2、 当页面是ProFullCourt 的时候，页面切换成FullCourt 页面显示数据为空

  const handleOnChange = (e: { target: { value: string } }) => {
    setFilterTag(e.target.value);
    // console.log(e.target.value);
    // if (isSuccess) {
    setTemplatesData(newData);
    setOffset(0);
    // console.log(templatesData);
    console.log(newData);
    console.log(filterTag);
    // }
    // NEED TO OPTIMIZE LOGIC
  };
  const templateEmpty = templatesData?.length === 0;

  return (
    <Box height="100%" className="scrollbox">
      <Select placeholder="Court Category" onChange={handleOnChange} value={filterTag}>
        <option value="ProFullCourt">ProFullCourt</option>
        <option value="FullCourt">FullCourt</option>
        <option value="SmallCourt">Small Court</option>
        <option value="ProHalfCourt">ProHalfCourt</option>
        <option value="MediumCourt">MediumCourt</option>
      </Select>
      {templatesData?.map((template: any, index: number) => {
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
