import React from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { switchMyAccount } from "@/store/reducer/buttonToggleSlice";
import Image from "next/image";
import { useStoreSelector } from "@/store/hooks";
import { MdEdit } from "react-icons/md";

const MyAccountContainer = () => {
  const dispatch = useDispatch();

  const handleReturnToDesign = () => {
    dispatch(switchMyAccount(false));
  };

  const { firstName, lastName, email } = useStoreSelector((state) => state.user);

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
      <Text fontSize="32px" fontWeight="700">
        My Account
      </Text>
      <Box width="100%">
        <Flex
          height="100px"
          border="1px solid #B6B6B6"
          padding="0 52px"
          alignItems="center"
          marginBottom="-1px"
        >
          <Text fontWeight="700" fontSize="16px" flex={1}>
            Avatar
          </Text>
          <Box flex={1}>
            <Box
              width="68px"
              height="68px"
              borderRadius="50%"
              border="1px solid #B6B6B6"
              position="relative"
              overflow="hidden"
            >
              <Image src="" layout="fill" objectFit="cover" />
            </Box>
          </Box>
        </Flex>
        <Flex
          height="100px"
          border="1px solid #B6B6B6"
          padding="0 52px"
          alignItems="center"
          marginBottom="-1px"
        >
          <Text fontWeight="700" fontSize="16px" flex={1}>
            Name
          </Text>
          <Text fontWeight="700" fontSize="16px" flex={1}>
            {firstName} {lastName}{" "}
            <IconButton
              aria-label="edit name"
              icon={<MdEdit />}
              background="transparent"
              size="lg"
            />
          </Text>
        </Flex>
        <Flex
          height="100px"
          border="1px solid #B6B6B6"
          padding="0 52px"
          alignItems="center"
          marginBottom="-1px"
        >
          <Text fontWeight="700" fontSize="16px" flex={1}>
            Email Address
          </Text>
          <Text fontWeight="700" fontSize="16px" flex={1}>
            {email}
          </Text>
        </Flex>
        <Flex height="100px" border="1px solid #B6B6B6" padding="0 52px" alignItems="center">
          <Text fontWeight="700" fontSize="16px" flex={1}>
            Password
          </Text>
          <Box flex={1}>
            <Button
              padding="10px 24px"
              fontSize="18px"
              fontWeight="700"
              background="#F3F2F7"
              border="1px solid #344C5C"
            >
              Change Password
            </Button>
          </Box>
        </Flex>
      </Box>
      <Button variant="shareBtn" padding="10px 24px" onClick={handleReturnToDesign}>
        Return To Design
      </Button>
    </Flex>
  );
};

export default MyAccountContainer;
