import { Flex, Text, Box, Image } from "@chakra-ui/react";
// import logo from '../../../public/android-chrome-512x512.png';

export default function LoadingPage() {
  return (
    <Flex direction="column" justify="center" align="center" height="100vh" width="100vw">
      <Image boxSize="87px" objectFit="cover" src="./android-chrome-512x512.png" alt="logo" >
      </Image>
      <Text color="brand.primary" fontSize="16px" paddingTop="33px">
        Please wait while the court design is loading...
      </Text>
    </Flex>
  );
}
