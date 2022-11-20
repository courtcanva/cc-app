import { useStoreSelector } from "@/store/hooks";
import { updateUserInfo, userData } from "@/store/reducer/userSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, validPassword } from "../Login/helpers/userRequests";
import validatePwd from "../Login/helpers/validatePwd";
import EditInputGroup from "./EditInputGroup";

const EditPopUpWindow = ({
  onClose,
  isOpen,
  title,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string;
}) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [oldPsw, setOldPsw] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [confirmPsw, setConfirmPsw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [weakPasswordMsg, setWeakPasswordMsg] = useState("");
  const [incorrectPswMsg, setIncorrectPswMsg] = useState("");
  const currentUserId = useStoreSelector(userData).userId;
  const toast = useToast();
  const dispatch = useDispatch();

  const isBlank = (): boolean => {
    switch (title) {
      case "Change Your Name":
        return newFirstName === "" || newLastName == "";
      case "Change Your Password":
        return oldPsw === "" || newPsw === "" || confirmPsw === "";
      default:
        return true;
    }
  };

  const enterPress = (event: any) => {
    if (event.key === "Enter" && !isBlank()) {
      event.preventDefault();
      handleApply();
    }
  };

  const failMessage = () => {
    toast({
      title: "Operation failed, please try again",
      status: "error",
      isClosable: true,
      position: "bottom",
    });
  };
  const successMessage = () => {
    toast({
      title: "Operation successful!",
      status: "success",
      isClosable: true,
      position: "bottom",
    });
  };

  const handleApply = async () => {
    switch (title) {
      case "Change Your Name": {
        const res: AxiosResponse = await updateUser({
          userId: currentUserId,
          firstName: newFirstName,
          lastName: newLastName,
        });

        if (res.status !== 200) {
          failMessage();
          return;
        }
        successMessage();
        const data = res.data;
        localStorage.setItem("UserInfo", JSON.stringify(data));
        dispatch(
          updateUserInfo({
            userId: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
          })
        );
        onClose();
        break;
      }
      case "Change Your Password": {
        validatePwd(newPsw, confirmPsw, setWeakPasswordMsg, setErrorMessage);
        const response: AxiosResponse = await validPassword({
          userId: currentUserId,
          password: oldPsw,
        });
        if (response.status !== 200) {
          failMessage();
          return;
        }
        const result = response.data;
        result
          ? setIncorrectPswMsg("")
          : setIncorrectPswMsg("The password you entered is incorrect. Please try again");
        if (validatePwd(newPsw, confirmPsw, setWeakPasswordMsg, setErrorMessage) && result) {
          const res: AxiosResponse = await updateUser({
            userId: currentUserId,
            password: newPsw,
          });
          if (res.status !== 200) {
            failMessage();
            return;
          }
          successMessage();
          setWeakPasswordMsg("");
          setErrorMessage("");
          onClose();
        }
        break;
      }
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
      <ModalOverlay />
      <ModalContent padding="1% 2%" backgroundColor="#F5F5F5">
        <ModalHeader textAlign="center" fontFamily="Inter" fontWeight={700} fontSize="20px">
          {" "}
          {title}
        </ModalHeader>
        <ModalCloseButton
          margin="2% 1%"
          fontSize={20}
          _focus={{ borderColor: "white" }}
          onClick={() => {
            setNewFirstName("");
            setNewLastName("");
            setOldPsw("");
            setNewPsw("");
            setConfirmPsw("");
            setErrorMessage("");
            setWeakPasswordMsg("");
            setIncorrectPswMsg("");
          }}
        />
        {title === "Change Your Name" && (
          <ModalBody>
            <EditInputGroup
              inputType="name"
              label="First Name"
              setNewFirstName={setNewFirstName}
              keyBoardEvent={enterPress}
            />
            <EditInputGroup
              inputType="name"
              label="Last Name"
              setNewLastName={setNewLastName}
              keyBoardEvent={enterPress}
            />
          </ModalBody>
        )}
        {title === "Change Your Password" && (
          <ModalBody>
            <EditInputGroup
              inputType="password"
              label="Enter your password"
              setPassword={setOldPsw}
              incorrectPswMsg={incorrectPswMsg}
              setIncorrectPswMsg={setIncorrectPswMsg}
              keyBoardEvent={enterPress}
              key={0}
            />
            <EditInputGroup
              inputType="password"
              label="New password"
              setPassword={setNewPsw}
              weakPasswordMsg={weakPasswordMsg}
              setWeakPasswordMsg={setWeakPasswordMsg}
              keyBoardEvent={enterPress}
              key={1}
            />
            <EditInputGroup
              inputType="password"
              label="Confirm new password"
              setPassword={setConfirmPsw}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              keyBoardEvent={enterPress}
              key={2}
            />
          </ModalBody>
        )}

        <ModalFooter justifyContent="center">
          <Button variant="shareBtn" width="25%" isDisabled={isBlank()} onClick={handleApply}>
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPopUpWindow;
