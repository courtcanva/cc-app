import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
import useAuthRequest from "./helpers/authRequest";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  getUserId: (userId: string) => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
};

const Register: React.FC<Props> = (props: Props) => {
  const { nextStep, prevStep, userEmail, onClose, setStep, getUserId } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { userRegister } = useAuthRequest();
  const toast = useToast();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userInfo = {
        email: userEmail,
        password,
        firstName,
        lastName,
      };
      const { data } = await userRegister(userInfo);
      if (data.status === "PENDING") {
        getUserId(data.data.userId);
        nextStep();
      } else {
        throw Error("Failed to send email.");
      }
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
  };
  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };

  return (
    <>
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
      <ModalHeader width="100%">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Sign up with
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form style={{ marginBottom: "30px", width: "300px" }} onSubmit={handleSubmit}>
            <Flex gap="10px">
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  value={firstName}
                  onChange={(event) => setFirstName(event?.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event?.currentTarget.value)}
                />
              </FormControl>
            </Flex>
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => setPassword(event?.currentTarget.value)}
            />
            <PwdInputGroup
              label="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event?.currentTarget.value)}
            />
            <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
              Create Account
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};

export default Register;
