import { ITags } from "@/interfaces/template";
import { Tag } from "@chakra-ui/react";
interface Props {
  tags: ITags;
}
const CourtTags = (prop: Props) => {
  return (
    <>
      <Tag size="sm" fontWeight="bold" borderRadius="0" backgroundColor="tag.courtCategory">
        {prop.tags.CourtCategory.toUpperCase()}
      </Tag>
      <Tag size="sm" fontWeight="bold" borderRadius="0" backgroundColor="tag.courtType">
        {prop.tags.CourtType.toUpperCase()}
      </Tag>
    </>
  );
};
export default CourtTags;
