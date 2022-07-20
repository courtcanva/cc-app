import { Flex, Text } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <Flex direction="column" justify="center" align="center" height="100vh" width="100vw">
      <Text fontWeight="bold" fontSize="72px">
        Loading...
      </Text>
    </Flex>
  );
}
