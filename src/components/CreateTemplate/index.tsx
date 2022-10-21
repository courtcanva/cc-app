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
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAddTemplateMutation } from "@/redux/api/templateApi";
import SuccessNotice from "./SuccessNotice";
import generateNewTemplate from "@/utils/generateNewTemplate";
import {
  INPUT_ERROR_MSG,
  INPUT_ERR_INIT,
  MAX_COURTNAME_LEN,
  MAX_DESCRIPTION_LEN,
} from "@/constants/templateCreate";
import ErrorMsg from "./ErrorMsg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CreateTemplate({ isOpen, onClose }: Props) {
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [inputError, setInputError] = useState(INPUT_ERR_INIT);
  const [textAreaLen, setTextAreaLen] = useState(0);
  const { userId, firstName, lastName } = useStoreSelector((state) => state.user);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  const { court: selectedCourtTileData } = useStoreSelector((state) => state.tile.present);
  const [addTemplate] = useAddTemplateMutation();

  const courtType = "basketball";
  const {
    isOpen: isSuccessNoticeOpen,
    onOpen: handleSuccessNoticeOpen,
    onClose: handleSuccessNoticeClose,
  } = useDisclosure();

  const closeWindow = () => {
    setInputError(INPUT_ERR_INIT);
    setTextAreaLen(0);
    onClose();
  };

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.currentTarget.value.trim().length;
    setInputError((inputError) => ({
      ...inputError,
      courtNameFullErr: nameInputLen > MAX_COURTNAME_LEN,
      courtNameNullErr: nameInputLen === 0,
    }));
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaLength = e.currentTarget.value.trim().length;
    setTextAreaLen(textAreaLength);
    setInputError((inputError) => ({
      ...inputError,
      descriptionOverLimit: textAreaLength > MAX_DESCRIPTION_LEN,
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
        closeWindow();
      })
      .catch((_err) => {
        alert("Whoops! unsuccessful publish your template, please try again!");
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeWindow} size="2xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader role="modalTitle">Template sharing</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="0.5rem 1.5rem">
            <FormLabel>Court Preview:</FormLabel>
            <Flex
              fontSize="2rem"
              fontWeight="500"
              width="20rem"
              height="11rem"
              backgroundColor="orange"
              justifyContent="center"
              alignItems="center"
              margin="1.8rem auto"
            >
              Court Image
            </Flex>
            <Flex gap="1.5rem" justifyContent="center" flexWrap="wrap">
              <Badge margin="1rem" colorScheme="green">
                {courtType}
              </Badge>
              <Badge margin="1rem">{selectedCourt.courtName}</Badge>
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
                  placeholder="Court name"
                  width="15rem"
                  onChange={checkNameLength}
                  autoFocus
                  ref={courtNameRef}
                  aria-label="courtNameInput"
                />
                <ErrorMsg userInputError={inputError} inputErrorMsg={INPUT_ERROR_MSG} />
              </FormControl>
              <Box width="50%">
                <Text margin="1rem 0px" fontSize="medium" fontWeight="500">
                  Publisher:
                </Text>
                <Flex alignItems="center">
                  <Icon as={FaUserCircle} fontSize="2.5rem" marginRight="1.8rem" />
                  <Text
                    fontSize="large"
                    fontWeight="500"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {`${firstName} ${lastName}`}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <FormControl isInvalid={inputError.descriptionOverLimit}>
              <FormLabel margin="1rem 0px" fontSize="medium" fontWeight="500">
                Description:
              </FormLabel>
              <Textarea
                height="8rem"
                placeholder={`Description: maximum ${MAX_DESCRIPTION_LEN} words`}
                onChange={handleTextAreaLenChange}
                resize="none"
                ref={descriptionRef}
                aria-label="textArea"
              />
              <Text color={textAreaLen < MAX_DESCRIPTION_LEN ? "black" : "crimson"}>
                {inputError.descriptionOverLimit ? (
                  <FormErrorMessage>{INPUT_ERROR_MSG.descriptionLenErrMsg}</FormErrorMessage>
                ) : (
                  <FormHelperText>
                    {textAreaLen}/{MAX_DESCRIPTION_LEN} letters
                  </FormHelperText>
                )}
              </Text>
            </FormControl>
          </ModalBody>
          <Flex justifyContent="space-around" margin="1.5rem" flexWrap="wrap">
            <Button colorScheme="blue" variant="shareBtn" paddingX="3rem" onClick={submitTemplate}>
              Publish
            </Button>
            <Button fontSize="lg" onClick={closeWindow} paddingX="3rem" borderRadius="6px">
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
