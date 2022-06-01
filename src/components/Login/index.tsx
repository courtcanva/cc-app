import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { Flex, Text, Link, Spacer, Grid, SimpleGrid, useDisclosure } from "@chakra-ui/react";

import GoogleSvg from "@/assets/svg/LoginSvg/gmail.svg";

function MContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" justifyContent="space-around" h="300px">
            <Flex flexDir="column">
              <Text fontSize="xl" fontWeight="bold">
                Log in or sign up
              </Text>
              <Text fontSize="sm">
                use your email or google account to continue with CourtCanva
              </Text>
            </Flex>

            <Button cursor="pointer" _active={{ bgColor: "CourtSizecolor.btc" }}>
              <IconButton
                aria-label="Gmail"
                colorScheme="transparent"
                icon={<GoogleSvg />}
                left="-50px"
                variant="loginBtn"
                isActive={true}
                // isDisabled={true}
              />
              <Text>Continue with Google </Text>
            </Button>

            <Button cursor="pointer" _active={{ bgColor: "CourtSizecolor.btc" }}>
              <Text>Continue with email</Text>
            </Button>

            <Text fontSize="sm">
              By continuing, you agree to to CourtCanva’s&nbsp;
              <Link href="#" textDecoration="underline" _hover={{ color: "CourtSizecolor.btc" }}>
                Term of Use.&nbsp;
              </Link>
              Read our&nbsp;
              <Link href="#" textDecoration="underline" _hover={{ color: "CourtSizecolor.btc" }}>
                Privacy Policy.
              </Link>
            </Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </>
  );
}

export default MContent;
