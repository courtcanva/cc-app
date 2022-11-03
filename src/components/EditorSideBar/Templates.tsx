import { ITemplateDataDb } from "@/interfaces/template";
import { Box, Text } from "@chakra-ui/react";
import TemplateItem from "../TemplateList/TemplateItem";

interface Props {
  templatesData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
}

const Templates = (prop: Props) => {
  const templateEmpty = prop.templatesData?.length === 0;
  return (
    <Box height="100%" className="scrollbox">
      {prop.templatesData?.map((template) => {
        return <TemplateItem key={template._id} template={template} />;
      })}
      {templateEmpty && <Text>The template list is empty</Text>}
    </Box>
  );
};
export default Templates;
