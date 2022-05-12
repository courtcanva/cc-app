import { Button, Center, Container, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

const CourtSize = () => {
  const [flag, setFlag] = useState(false);

  const selectCourtSize = (): void => {
    setFlag(!flag);
  };

  return (
    <Container maxWidth="container.xl">
      <Center>
        <Button colorScheme="teal" color="#000000" w={228} h={39} onClick={selectCourtSize}>
          Select court size
        </Button>
      </Center>

      <Flex h="768" py={10} justify="center">
        {flag ? (
          <VStack w="1115" h="704" alignItems="center">
            <Image
              src="/../public/blank-page-1115x704.png"
              alt="blank-page"
              width="1115"
              height="704"
            />
          </VStack>
        ) : (
          <VStack w="1115" h="704" alignItems="center">
            <Image src="/../public/six-courts.png" alt="six-courts" width="1115" height="704" />
          </VStack>
        )}
      </Flex>
    </Container>
  );
};

export default CourtSize;
