import { ITemplateDataDb } from "@/interfaces/template";
import { Box } from "@chakra-ui/react";
import TemplateItem from "../TemplateList/TemplateItem";

interface Props {
  templatesData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
}

const Templates = (prop: Props) => {
  return (
    <Box height="100%" className="scrollbox">
      {prop.templatesData?.map((template) => {
        return <TemplateItem key={template._id} template={template} />;
      })}
    </Box>
  );
};
export default Templates;
