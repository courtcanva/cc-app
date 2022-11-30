/* eslint-disable require-jsdoc */
import { SimpleGrid, Center, Text, Button, Box } from "@chakra-ui/react";
import NextHeadSeo from "next-head-seo";
import Card from "@/components/Team/Card";
import Link from "next/link";
import { environment } from "@/constants/environment";
import { IGroupedMembers } from "@/interfaces/team";
import { IMember } from "@/interfaces/team";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  groupedTeamMembers: GroupedTeamMembers;
}

interface GroupedTeamMembers {
  [key: string]: IMember[];
}

export default function Team({ groupedTeamMembers }: Props) {
  const CarouselIndicator = (onClickHandler: any, isSelected: boolean, index: number) => {
    const defStyle = { marginLeft: 20, color: "lightgrey", cursor: "pointer", fontWeight: "bold" };
    const style = isSelected ? { ...defStyle, color: "#2C4E8A" } : { ...defStyle };
    return (
      <span onClick={onClickHandler} style={style}>
        {index + 1}
      </span>
    );
  };

  return (
    <>
      <NextHeadSeo
        title={`Team members - Courtcanva`}
        description={`Introduction and contact information of team members of CourtCanva`}
        canonical={`http://design.courtcanva.com/team`}
      />
      <Center paddingY="85px" flexDirection="column" overflow="hidden">
        <Text fontSize="32px" fontWeight="bold" marginTop="-20px">
          Meet the Team
        </Text>
        <Carousel
          showStatus={false}
          showArrows={false}
          emulateTouch={true}
          autoPlay={true}
          infiniteLoop={true}
          renderIndicator={CarouselIndicator}
        >
          {Object.keys(groupedTeamMembers).map((key) => {
            return (
              <Center key={key} marginX="60px" paddingY="40px" flexDirection="column">
                <Text fontSize="18px" fontWeight="bold" color="#2C4E8A">
                  {key}
                </Text>
                <SimpleGrid columns={{ base: 2, lg: 3 }} spacing="16px" marginY="25px">
                  {groupedTeamMembers[key].map((member) => {
                    return <Card key={member._id} member={member} />;
                  })}
                </SimpleGrid>
              </Center>
            );
          })}
        </Carousel>
        <Link href={environment.designURL as string} passHref>
          <Button paddingX="2.5rem" variant="shareBtn">
            Take me back to homepage
          </Button>
        </Link>
      </Center>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/team-member?isGrouped=true`);
  const teamMembers: IGroupedMembers = await res.json();

  const groupedTeamMembers: GroupedTeamMembers = {};
  const maxCardQty = 9;
  let mergeKey = "";

  Object.keys(teamMembers).forEach((key) => {
    if (teamMembers[key].length > maxCardQty) {
      for (let i = 0; i < teamMembers[key].length; i = i + maxCardQty) {
        const keyName = `${key} ${i / maxCardQty + 1}/${Math.ceil(
          teamMembers[key].length / maxCardQty
        )}`;
        groupedTeamMembers[keyName] = teamMembers[key].slice(i, i + maxCardQty);
      }
    } else if (teamMembers[key].length <= maxCardQty / 2) {
      if (mergeKey === "") {
        mergeKey = key;
        groupedTeamMembers[key] = teamMembers[key];
      } else {
        const keyName = `${mergeKey} & ${key}`;
        groupedTeamMembers[keyName] = [...groupedTeamMembers[mergeKey], ...teamMembers[key]];
        delete groupedTeamMembers[mergeKey];
        mergeKey = "";
      }
    } else {
      groupedTeamMembers[key] = teamMembers[key];
    }
  });

  return {
    props: {
      groupedTeamMembers,
    },
  };
}
