import { ITags } from "@/interfaces/template";
import { Flex, Tag } from "@chakra-ui/react";
interface Props {
  tags: ITags;
}
const CourtTags = (prop: Props) => {
  return (
    <>
      <Tag size="sm" borderRadius="0" variant="solid" colorScheme="purple">
        {prop.tags.CourtCategory.toUpperCase()}
      </Tag>
      <Tag size="sm" borderRadius="0" variant="solid" colorScheme="orange">
        {prop.tags.CourtType.toUpperCase()}
      </Tag>
    </>
  );
};
export default CourtTags;
