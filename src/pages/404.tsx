import NavigationBar from "@/components/NavBar";
import Link from "next/link";
import { Flex, Button, Text } from "@chakra-ui/react";
import UnSmile from "@/assets/svg/404.svg";
import HOME_PAGE_LINK from "@/constants";

export default function Custon404() {
  return (
    <>
      {/* <NavigationBar/> */}
      <Flex direction="column" justify="center" align="center">
        <UnSmile />
        <Text fontWeight="bold" fontSize="8xl">
          404
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          Oops!Something went wrong
        </Text>
        <Link href={HOME_PAGE_LINK} passHref>
          <Button mt="1rem" variant="shareBtn" pl="2.5rem" pr="2.5rem">
            Take me back to homepage
          </Button>
        </Link>
      </Flex>
    </>
  );
}
