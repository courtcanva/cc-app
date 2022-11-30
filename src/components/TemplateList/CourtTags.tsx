import { ITags } from "@/interfaces/template";
import { Tag, HStack } from "@chakra-ui/react";
interface Props {
  tags: ITags;
}
const CourtTags = (prop: Props) => {
  return (
    <HStack spacing={8} style={{ margin: "4px" }}>
      <Tag size="sm" variant="courtName">
        {prop.tags.CourtCategory}
      </Tag>
      <Tag size="sm" variant="courtType">
        {prop.tags.CourtType.toUpperCase()}
      </Tag>
    </HStack>
  );
};
export default CourtTags;
