import {
  ModalHeader,
  ModalBody,
  Flex,
  Text,
  Icon,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import MainLogoSvg from "@/assets/svg/CourtCanva-main-LOGO.svg";
import React, { useState } from "react";
import PwdInputGroup from "./PwdInputGroup";
import ModalOperator from "./ModalOperater";
import useAuthRequest from "./helpers/authRequest";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/store/reducer/userSlice";
type Props = {
  prevStep: () => void;
  onClose: any;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  userEmail: string;
  initialRef: React.MutableRefObject<null>;
  updateLoginData: (data: any) => void;
};

const LoginWithPwd: React.FC<Props> = (props: Props) => {
  const { prevStep, userEmail, onClose, setStep, updateLoginData } = props;
  const [password, setPassword] = useState("");
  const { userLogin } = useAuthRequest();
  const toast = useToast();
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setStep(1);
    onClose();
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await userLogin(userEmail, password);
      if (res.status === 200) {
        // TODO: Store user data into local storage after logging, NO userInfo returned
        // localStorage.setItem("UserInfo", JSON.stringify(data));
        // dispatch(updateUserInfo(data));
        // updateLoginData(data);
        // TODO: deal with return tokens
        onClose();
      }
    } catch (err) {
      toast({
        title: "network error",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ModalOperator handleCloseModal={handleCloseModal} prevStep={prevStep} />
      <ModalHeader>
        <Flex flexDir="column" alignItems="center">
          <Icon width="240px" height="180px" viewBox="0 0 800 600" role="logo">
            <MainLogoSvg />
          </Icon>
          <Text fontSize="sm" textAlign="center">
            Sign up with <br /> {userEmail}
          </Text>
          <Divider />
        </Flex>
      </ModalHeader>
      <ModalBody>
        <Flex flexDir="column" alignItems="center">
          <form style={{ marginBottom: "30px", width: "300px" }} onSubmit={handleSubmit}>
            <PwdInputGroup
              label="Password"
              value={password}
              onChange={(event) => setPassword(event?.currentTarget.value)}
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
