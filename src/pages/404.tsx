import Link from "next/link";
import { Flex, Button, Text } from "@chakra-ui/react";
import UnSmile from "@/assets/svg/404.svg";
import NextHeadSeo from "next-head-seo";

export default function Custom404() {
  return (
    <>
      <NextHeadSeo
        title={`404 Error page - Courtcanva`}
        description={`404 Error page on CourtCanva`}
        canonical={`http://www.courtcanva.com/404`}
      />
      <Flex direction="column" justify="center" align="center" h="calc(100vh - 72px)">
        <UnSmile data-testid="unSmile" />
        <Text fontWeight="bold" fontSize="8xl">
          404
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          Oops! Something went wrong.
        </Text>
        <Link href={process.env.NEXT_PUBLIC_DESIGN_URL as string} passHref>
          <Button mt="1rem" pl="2.5rem" pr="2.5rem" variant="shareBtn">
            Take me back to homepage
          </Button>
        </Link>
      </Flex>
    </>
  );
}
