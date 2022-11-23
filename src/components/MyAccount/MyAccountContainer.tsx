import React from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { switchMyAccount } from "@/store/reducer/buttonToggleSlice";
import Image from "next/image";
import { useStoreSelector } from "@/store/hooks";
import { MdEdit } from "react-icons/md";
import FlexContainer from "./FlexContainer";

const MyAccountContainer = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useStoreSelector((state) => state.user);
  const avatarUrl = "";

  const handleReturnToDesign = () => {
    dispatch(switchMyAccount(false));
  };

  return (
    <Flex
      position="fixed"
      backgroundColor="#fff"
      top="72px"
      padding="40px 120px"
      width="100vw"
      height="100vh"
      zIndex={1600}
      gap="50px"
      flexDirection="column"
      color="brand.primary"
      alignItems="center"
    >
      <Text variant="headerFont">My Account</Text>
      <Box width="100%">
        <FlexContainer
          title="Avatar"
          content={
            <Box
              width="68px"
              height="68px"
              borderRadius="50%"
              border="1px solid #B6B6B6"
              position="relative"
              overflow="hidden"
            >
              {avatarUrl && <Image src={avatarUrl} layout="fill" objectFit="cover" />}
            </Box>
          }
        />
        <FlexContainer
          title="Name"
          content={
            <Text variant="textFont">
              {firstName} {lastName}{" "}
              <IconButton
                aria-label="edit name"
                icon={<MdEdit />}
                background="transparent"
                size="lg"
              />
            </Text>
          }
        />
        <FlexContainer title="Email Address" content={<Text variant="textFont">{email}</Text>} />
        <FlexContainer
          title="Password"
          content={
            <Button
              padding={{ base: "5px 12px", lg: "7.5px 18px", xl: "10px 24px" }}
              background="#F3F2F7"
              border="1px solid #344C5C"
            >
              <Text variant="textFont">Change Password</Text>
            </Button>
          }
        />
      </Box>
      <Button variant="shareBtn" padding="10px 24px" onClick={handleReturnToDesign}>
        Return to Design
      </Button>
    </Flex>
  );
};

export default MyAccountContainer;
