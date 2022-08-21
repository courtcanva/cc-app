import React from "react";
import { Flex, Image, Text, Link } from "@chakra-ui/react";
import { BsLinkedin, BsGithub, BsFillEnvelopeFill } from "react-icons/bs";

interface Props {
  key: string;
  member: {
    id: string;
    name: string;
    profileImg: string;
    role: string;
    linkedInUrl: string;
    githubUrl: string;
    emailAddress: string;
  };
}

const Card = (props: Props) => {
  const { name, profileImg, linkedInUrl, githubUrl, role, emailAddress } = props.member;

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
      <Image
        src={profileImg}
        marginX="auto"
        width="100px"
        height="100px"
        borderRadius="50%"
        border="5px solid rgba(0, 0, 0, .1)"
      />
      <Flex flexDirection="column" marginX="20px" width="150px">
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
