import { ModalHeader, ModalBody, Flex, Text, Icon, Divider, Button } from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
import useAuthRequest from "./helpers/authRequest";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";

type Props = {
  prevStep: () => void;
  nextStep: () => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
  updateLoginData: (data: any) => void;
  getUserId: (userId: string) => void;
  currentStep: number;
};

const LoginWithPwd: React.FC<Props> = (props: Props) => {
  const {
    prevStep,
    nextStep,
    userEmail,
    onClose,
    setStep,
    updateLoginData,
    getUserId,
    currentStep,
  } = props;
  const [password, setPassword] = useState("");
  const [isLoginFail, setIsLoginFail] = useState(false);
  const { userLogin, resendOTP } = useAuthRequest();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };
  const handlePassword = (value: string) => {
    setIsLoginFail(false);
    setPassword(value);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await userLogin(userEmail, password);
      if (response.status !== 200) {
        throw Error("Failed to login.");
      }
      const data = response.data;
      getUserId(data.userId);
      if (data.isActivated) {
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(updateUserInfo(data));
        updateLoginData(data);
        setStep(1);
        onClose();
      } else {
        await resendOTP(data.userId, userEmail);
        nextStep();
      }
    } catch (err) {
      setIsLoginFail(true);
    }
  };
  return (
    <>
      <ModalOperator
        handleCloseModal={handleCloseModal}
        prevStep={prevStep}
        email={userEmail}
        currentStep={currentStep}
      />
      <ModalHeader width="100%" marginTop="-20px">
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Login with
            <Text color="brand.secondary">{userEmail}</Text>
          </Text>
          <Divider />
          <Text fontSize="md" color={isLoginFail ? "red.500" : "black"}>
            {isLoginFail ? "Incorrect Password!" : ""}
          </Text>
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form style={{ marginBottom: "30px", width: "300px" }} onSubmit={handleSubmit}>
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => handlePassword(event?.currentTarget.value)}
            />
            <Button variant="shareBtn" width="300px" marginTop="20px" type="submit">
              Continue Login
            </Button>
          </form>
        </Flex>
      </ModalBody>
    </>
  );
};
export default LoginWithPwd;
