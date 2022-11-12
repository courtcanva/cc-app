import { LIMIT } from "@/constants/templateItemPagination";
import { useLazyGetTemplateListsQuery } from "@/redux/api/templateApi";
import { Box, Select, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import TemplateItem from "../TemplateList/TemplateItem";

const Templates = () => {
  const [offset, setOffset] = useState<number>(0);
  const [templatesData, setTemplatesData] = useState<any>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("");
  const limit = LIMIT;

  const [trigger, { data: rawTemplateData, isLoading }] = useLazyGetTemplateListsQuery();

  useEffect(() => {
    trigger({ offset, limit, filterTag });
  }, []);

  useEffect(() => {
    const fetchData = trigger({ offset, limit, filterTag });
    return () => fetchData.abort();
  }, [offset, filterTag]);

  useEffect(() => {
    const newData = rawTemplateData?.data;
    if (newData) {
      setTemplatesData((prev: any) => [...prev, ...newData]);
      setHasNextPage(Boolean(rawTemplateData?.data.length));
    }
  }, [rawTemplateData?.data]);

  const handleOnChange = (e: { target: { value: string } }) => {
    setFilterTag(() => e.target.value);
    setTemplatesData(() => []);
    setOffset(() => 0);
  };

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastTemplateRef = useCallback(
    (template) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current?.disconnect();
      intObserver.current = new IntersectionObserver((templatesData) => {
        if (templatesData[0].isIntersecting && hasNextPage) {
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
