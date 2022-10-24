import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { Box } from "@chakra-ui/react";
import TemplateItem from "./TemplateItem";
const Template = () => {
  const { data } = useGetTemplatesQuery("");
  console.log(data);

  return (
    <Box height="100%" className="scrollbox">
      {data?.map((template) => {
        return <TemplateItem key={template._id} template={template} />;
      })}
    </Box>
  );
};
export default Template;
