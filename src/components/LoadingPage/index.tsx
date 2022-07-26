import { Flex, Text, Image } from "@chakra-ui/react";


export default function LoadingPage() {
  return (
    <Flex position="fixed"
      top="123px"
      left="98px"
      width="calc(100% - 98px)"
      height="calc(100% - 230px)"
      margin="auto"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      >

      <Image boxSize="87px" objectFit="cover" src="./android-chrome-512x512.png" alt="logo" >
      </Image>
      <Text color="brand.primary" fontSize="16px" paddingTop="33px">
        Please wait while the court design is loading...
      </Text>
    </Flex>
  );
}
