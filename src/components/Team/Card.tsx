import React from "react";
import { Flex, Text, Link, Box } from "@chakra-ui/react";
import { BsLinkedin, BsGithub, BsFillEnvelopeFill } from "react-icons/bs";
import { IMember } from "@/interfaces/team";
import Image from "next/image";

interface Props {
  key: string;
  member: IMember;
}

const Card = (props: Props) => {
  const { name, profileImgUrl, linkedInUrl, githubUrl, role, emailAddress } = props.member;

  return (
    <Flex
      borderRadius="2px"
      padding="20px"
      height="150px"
      width="300px"
      alignItems="center"
      justifyContent="center"
      boxShadow="-1px 0px 20px rgba(0, 0, 0, .1)"
    >
      <Box
        marginX="auto"
        width="100px"
        height="100px"
        borderRadius="50%"
        border="5px solid rgba(0, 0, 0, .1)"
        flex="1.5"
        position="relative"
        overflow="hidden"
      >
        <Image src={profileImgUrl} layout="fill" objectFit="cover" />
      </Box>
      <Flex flexDirection="column" marginX="20px" width="150px" flex="2">
        <Text fontWeight="600" textAlign="center" fontSize="sm">
          {name}
        </Text>
        <Text textAlign="center" fontSize="xs" fontWeight="400">
          {role}
        </Text>
        <Flex justify="space-between" w="100%" marginTop="10px" paddingX="20px">
          <Link href={linkedInUrl} target="_blank" color="background.primary">
            <BsLinkedin size="16px" />
          </Link>
          <Link href={githubUrl} target="_blank" color="background.primary">
            <BsGithub size="16px" />
          </Link>
          <Link href={`mailto:${emailAddress}`} color="background.primary">
            <BsFillEnvelopeFill size="16px" />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Card;
