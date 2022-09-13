import { SimpleGrid, Center, Text, Button } from "@chakra-ui/react";
import NextHeadSeo from "next-head-seo";
import Card from "@/components/Team/Card";
import { memberList } from "@/components/Team/memberList";
import Link from "next/link";
import { environment } from "@/constants/environment";

const Team = () => {
  return (
    <>
      <NextHeadSeo
        title={`Team members - Courtcanva`}
        description={`Introduction and contact information of team members of CourtCanva`}
        canonical={`http://design.courtcanva.com/team`}
      />
      <Center paddingY="80px" flexDirection="column">
        <Text fontSize="32px" fontWeight="bold">
          Meet the Team
        </Text>
        <SimpleGrid columns={{ base: 2, lg: 3 }} spacing="20px" marginY="30px">
          {memberList.map(function (member) {
            const { id } = member;
            return <Card key={id} member={member} />;
          })}
        </SimpleGrid>
        <Link href={environment.designURL as string} passHref>
          <Button mt="1rem" pl="2.5rem" pr="2.5rem" variant="shareBtn">
            Take me back to homepage
          </Button>
        </Link>
      </Center>
    </>
  );
};

export default Team;
