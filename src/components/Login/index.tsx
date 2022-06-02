import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { Flex, Text, Icon, Link, useDisclosure } from "@chakra-ui/react";

import GoogleSvg from "@/assets/svg/LoginSvg/gmail.svg";
import EmailSvg from "@/assets/svg/LoginSvg/email.svg";

function LoginModalContent(props: any) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size={"sm"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex flexDir="column" mt="40px" mb="20px">
            <Text fontSize="xl" fontWeight="bold">
              Log in or sign up
            </Text>
            <Text fontSize="sm">Use your email or google account to continue with CourtCanva</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody mb="20px">
          <Flex flexDir="column" justifyContent="space-around" gap="25px">
            <Button variant="loginBtn2" position="relative">
              <Icon w="24px" h="24px" position="absolute" top="11px" left="20px">
                <GoogleSvg />
              </Icon>
              <Text>Continue with Google </Text>
            </Button>

            <Button variant="loginBtn2" position="relative">
              <Icon w="24px" h="24px" position="absolute" top="12px" left="20px">
                <EmailSvg />
              </Icon>
              <Text>Continue with Email </Text>
            </Button>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Text fontSize="sm">
            By continuing, you agree to to CourtCanva’s&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "CourtSizecolor.btc" }}>
              Term of Use.
            </Link>
            &nbsp;Read our&nbsp;
            <Link href="#" textDecoration="underline" _hover={{ color: "CourtSizecolor.btc" }}>
              Privacy Policy.
            </Link>
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModalContent;
