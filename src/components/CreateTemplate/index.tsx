/* eslint-disable require-jsdoc */
import { useStoreSelector } from "@/store/hooks";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Text,
  Textarea,
  Icon,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAddTemplateMutation } from "@/redux/api/templateApi";
import SuccessNotice from "./SuccessNotice";
import generateNewTemplate from "@/utils/generateNewTemplate";
import { userNameEllip } from "../../utils/handleLongUserName";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 15;
const maxDescriptionLen = 200;
const maxUserNameDisplay = 20;
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

const inputErrorInit = {
  courtNameFullErr: false,
  courtNameNullErr: false,
  descriptionOverLimit: false,
};

const inputErrorMsg = {
  nameFullErrMsg: `Court name cannot have more than ${maxCourtNameLen} characters`,
  nameNullErrMsg: "Court name cannot be empty",
  descriptionLenErrMsg: `Description can not over ${maxDescriptionLen} words`,
};

function CreateTemplate({ isOpen, onClose }: Props) {
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [inputError, setInputError] = useState(inputErrorInit);
  const [textAreaLen, setTextAreaLen] = useState(0);
  const { userId, firstName, lastName } = useStoreSelector((state) => state.user);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  const { court: selectedCourtTileData } = useStoreSelector((state) => state.tile.present);
  const [addTemplate] = useAddTemplateMutation();
  const courtType = "basketball";
  const userFullName = userNameEllip(`${firstName} ${lastName}`, maxUserNameDisplay);
  const {
    isOpen: isSuccessNoticeOpen,
    onOpen: handleSuccessNoticeOpen,
    onClose: handleSuccessNoticeClose,
  } = useDisclosure();

  const closeWindow = () => {
    setInputError(inputErrorInit);
    setTextAreaLen(0);
    onClose();
  };

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.currentTarget.value.length;
    setInputError((inputError) => ({
      ...inputError,
      courtNameFullErr: nameInputLen >= maxCourtNameLen,
      courtNameNullErr: nameInputLen === 0,
    }));
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaLength = e.currentTarget.value
      .replace(regex, " ")
      .split(" ")
      .filter((item) => item != "").length;
    setTextAreaLen(textAreaLength);
    setInputError((inputError) => ({
      ...inputError,
      descriptionOverLimit: textAreaLength >= maxDescriptionLen,
    }));
  };

  const submitTemplate = async () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    if (!courtName || inputError.descriptionOverLimit || inputError.courtNameFullErr) {
      setInputError((inputError) => ({
        ...inputError,
        courtNameNullErr: !courtName,
      }));
      return;
    }
    const packedTemplate = generateNewTemplate(
      userId,
      courtName,
      description,
      selectedCourtTileData,
      selectedCourt
    );
    await addTemplate(packedTemplate)
      .unwrap()
      .then((_res) => {
        handleSuccessNoticeOpen();
      })
      .catch((err) => {
        alert(`Woops! unsuccessful publish of your template, please try again!`);
      });
    closeWindow();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeWindow} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader role="modalTitle">Template sharing</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="8px 24px">
            <FormControl>
              <FormLabel>Court Preview:</FormLabel>
              <Box width={300} height={150} backgroundColor="orange" margin="30px auto">
                Court Image
              </Box>
            </FormControl>
            <Flex gap="24px" justifyContent="center" flexWrap="wrap">
              <Badge margin="16px" colorScheme="green">
                {courtType}
              </Badge>
              <Badge margin="16px">{selectedCourt.courtName}</Badge>
            </Flex>
            <Flex>
              <FormControl
                width="50%"
                marginTop="1rem"
                isRequired
                isInvalid={inputError.courtNameFullErr}
              >
                <FormLabel marginBottom="1rem">Template Court Name:</FormLabel>
                <Input
                  role="courtNameInput"
                  placeholder="Court name"
                  width="240px"
                  onChange={checkNameLength}
                  ref={courtNameRef}
                />
              </FormControl>
              <Box width="50%">
                <Text margin="16px 0px" fontSize="medium" fontWeight="500">
                  Publisher:
                </Text>
                <Flex alignItems="center">
                  <Icon as={FaUserCircle} fontSize="40px" marginRight="30px" />
                  <Text fontSize="large" fontWeight="500">
                    {userFullName}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Text
              color="crimson"
              visibility={
                inputError.courtNameFullErr || inputError.courtNameNullErr ? "visible" : "hidden"
              }
              fontSize="0.8rem"
            >
              {inputError.courtNameFullErr
                ? inputErrorMsg.nameFullErrMsg
                : inputErrorMsg.nameNullErrMsg}
            </Text>
            <FormControl marginTop="1rem">
              <FormLabel marginBottom="1rem">Description:</FormLabel>
              <Textarea
                height="150px"
                placeholder={`Description: maximum ${maxDescriptionLen} words`}
                onChange={handleTextAreaLenChange}
                ref={descriptionRef}
              />
            </FormControl>
            <Text role="wordCount" color={textAreaLen < maxDescriptionLen ? "black" : "crimson"}>
              {inputError.descriptionOverLimit
                ? inputErrorMsg.descriptionLenErrMsg
                : `${textAreaLen}/${maxDescriptionLen} words`}
            </Text>
          </ModalBody>
          <Flex justifyContent="space-around" margin="24px" flexWrap="wrap">
            <Button
              role="publishBtn"
              colorScheme="blue"
              variant="shareBtn"
              width="100px"
              onClick={submitTemplate}
            >
              Publish
            </Button>
            <Button role="cancelBtn" onClick={closeWindow} width="100px">
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      <SuccessNotice isOpen={isSuccessNoticeOpen} onClose={handleSuccessNoticeClose} />
    </>
  );
}
export default CreateTemplate;
