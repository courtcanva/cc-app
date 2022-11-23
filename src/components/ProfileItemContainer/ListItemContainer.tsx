import { Flex, Text, Button } from "@chakra-ui/react";

interface Props {
  title: string;
  listArray: unknown[] | undefined;
  myListsArrayFc: () => void;
  onClickHandler: () => void;
}

const ListItemsContainer = ({ title, onClickHandler, listArray, myListsArrayFc }: Props) => {
  const ListTitle = () => {
    return (
      <Text fontSize="lg" fontWeight="500" color="black" data-testid="emptyText">
        You currently have{" "}
        <Text display="inline" fontWeight="900">
          no items{" "}
        </Text>
      </Text>
    );
  };
  return (
    <Flex flexDirection="column" width="100vw" gap="28px" alignItems="center" min-height="100vh">
      <Text variant="headerFont">{title}</Text>
      {listArray?.length ? myListsArrayFc() : <ListTitle />}
      <Button
        variant="shareBtn"
        size="lg"
        padding="10px 24px"
        onClick={onClickHandler}
        marginBottom="28px"
      >
        Return to Design
      </Button>
    </Flex>
  );
};
export default ListItemsContainer;
