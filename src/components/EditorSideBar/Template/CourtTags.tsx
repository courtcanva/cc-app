import { ITags } from "@/interfaces/template";
import { Box, Flex, Tag } from "@chakra-ui/react";
interface Props {
  tags: ITags;
}
const CourtTags = (prop: Props) => {
  return (
    <Flex width="80%" wrap="wrap" gap="1em">
      <Tag size="sm" variant="solid" colorScheme="orange">
        {prop.tags.CourtType.toUpperCase()}
      </Tag>
      <Tag size="sm" variant="solid" colorScheme="purple">
        {prop.tags.CourtCategory.toUpperCase()}
      </Tag>
    </Flex>
  );
};
export default CourtTags;
