import { Flex, Text } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <Flex direction="column" justify="center" align="center" h="100vh" w="100vw">
      <Text fontWeight="bold" fontSize="96px">
        Loading...
      </Text>
    </Flex>
  );
}
