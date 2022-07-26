import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  FormControl,
  Input,
  Button,
  ModalFooter,
  Link,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import ModalOperator from "../ModalOperater";
import useAuthRequest from "../helpers/authRequest";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  validation: (verified: boolean) => void;
  updateLoginData: (data: any) => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  userId: string;
  initialRef: React.MutableRefObject<null>;
};
const EmailVerification: React.FC<Props> = (props: Props) => {
  const { userEmail, nextStep, onClose, setStep, prevStep, userId, validation, updateLoginData } =
    props;
  const [otp, setOtp] = useState("");
  const { verifyOTP, resendOTP } = useAuthRequest();
  const toast = useToast();
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await verifyOTP(userId, otp);
      if (data.tokens) {
        //  Store user data into local storage after verification, equals login
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        validation(true);
        nextStep();
      } else {
        validation(false);
        nextStep();
      }
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleResend = async () => {
    try {
      await resendOTP(userId, userEmail);
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
            Please enter the 4-digit code sent to
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "300px",
          }}
          onSubmit={handleSubmit}
        >
          <FormControl width="5rem" isRequired>
            <Input
              name="verifyCode"
              type="number"
              htmlSize={4}
              width="5rem"
              textAlign="center"
              value={otp}
              onChange={(event) => setOtp(event?.currentTarget.value)}
            />
          </FormControl>
          <Button variant="shareBtn" width="300px" marginTop="20px" onClick={handleSubmit}>
            Verify
          </Button>
        </form>
      </ModalBody>
      <ModalFooter marginBottom="20px">
        <Text fontSize="10px">
          Did not receive the email?
          {/* TODO: make resend UI with counting down and e.g. "re-sent" */}
          <Link
            href="#"
            textDecoration="underline"
            _hover={{ color: "fontcolor.tertiary" }}
            onClick={handleResend}
          >
            Resend
          </Link>
        </Text>
      </ModalFooter>
    </>
  );
};

export default EmailVerification;
