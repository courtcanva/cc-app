import {
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
const EditInputGroup = ({
  label,
  inputType,
  setNewFirstName,
  setNewLastName,
  setPassword,
  incorrectPswMsg,
  weakPasswordMsg,
  errorMessage,
  setErrorMessage,
  setWeakPasswordMsg,
  setIncorrectPswMsg,
  keyBoardEvent,
}: {
  label: string;
  inputType: string;
  setNewFirstName?: React.Dispatch<React.SetStateAction<string>>;
  setNewLastName?: React.Dispatch<React.SetStateAction<string>>;
  setPassword?: React.Dispatch<React.SetStateAction<string>>;
  incorrectPswMsg?: string;
  weakPasswordMsg?: string;
  errorMessage?: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  setWeakPasswordMsg?: React.Dispatch<React.SetStateAction<string>>;
  setIncorrectPswMsg?: React.Dispatch<React.SetStateAction<string>>;
  keyBoardEvent: (event: any) => void;
}) => {
  const [show, setShow] = useState(false);
  const visibleClick = () => setShow(!show);
  return (
    <FormControl>
      <FormLabel
        fontFamily="Inter"
        fontWeight={700}
        fontSize="16px"
        color={incorrectPswMsg || weakPasswordMsg || errorMessage ? "#C13D46" : "#344C5C"}
      >
        {label}
      </FormLabel>
      {inputType === "name" && (
        <Input
          _focus={{ backgroundColor: "#F1F6FF" }}
          borderColor="#7C9FDF"
          fontWeight={700}
          fontSize="16px"
          marginBottom={10}
          onChange={(e) => {
            setNewFirstName && setNewFirstName(e.target.value);
            setNewLastName && setNewLastName(e.target.value);
          }}
          onKeyPress={keyBoardEvent}
        />
      )}
      {inputType === "password" && (
        <Stack spacing={3}>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              _focus={{ backgroundColor: "#F1F6FF" }}
              color={incorrectPswMsg || weakPasswordMsg || errorMessage ? "#C13D46" : "#344C5C"}
              borderColor={
                incorrectPswMsg || weakPasswordMsg || errorMessage ? "#C13D46" : "#7C9FDF"
              }
              fontWeight={700}
              fontSize="16px"
              onChange={(e) => {
                setPassword && setPassword(e.target.value);
                setErrorMessage && setErrorMessage("");
                setWeakPasswordMsg && setWeakPasswordMsg("");
                setIncorrectPswMsg && setIncorrectPswMsg("");
              }}
              onKeyPress={keyBoardEvent}
            />
            <InputRightElement>
              <Icon
                as={show ? VscEye : VscEyeClosed}
                onClick={visibleClick}
                color={incorrectPswMsg || weakPasswordMsg || errorMessage ? "#C13D46" : "#344C5C"}
                cursor="pointer"
                data-testid="eyeIcon"
              />
            </InputRightElement>
          </InputGroup>
          <FormHelperText width="100%" color="#C13D46" fontFamily="Inter" height={10}>
            {incorrectPswMsg || weakPasswordMsg || errorMessage}
          </FormHelperText>
        </Stack>
      )}
    </FormControl>
  );
};

export default EditInputGroup;
