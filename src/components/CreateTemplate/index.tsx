import { useStoreSelector } from "@/store/hooks";
import { switchCreateTemplate } from "@/store/reducer/buttonToggleSlice";
import {
  useDisclosure,
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
  IconButton,
  Text,
  Textarea,
  Tag,
} from "@chakra-ui/react";
import React, { ReactEventHandler, useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 20;

function CreateTemplate(prop: Props) {
  const { isOpen, onClose } = prop;
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [courtNameLen, setCourtNameLen] = useState(false);
  const [textAreaLen, setTextAreaLen] = useState(0);
  const { userId } = useStoreSelector(state => state.user)

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.target.value.length;
    if (nameInputLen >= maxCourtNameLen) {
      setCourtNameLen(true);
    } else {
      setCourtNameLen(false);
    }
  };

  const getTextAreaLen = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaLen(e.currentTarget.value.length);
  }

  const submitTemplate = () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    const image = "";
    const id = "";
    
    // tags咋办啊
  }

  useEffect(() => {
    setCourtNameLen(false);
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Template sharing</ModalHeader>
          <ModalCloseButton />
          <ModalBody padding="8px 24px">
            <FormControl>
              <FormLabel>Court Preview:</FormLabel>
              <Box width={300} height={150} backgroundColor="orange" margin="30px auto">
                Court Image
              </Box>
            </FormControl>

            {/* tags
            <Flex padding="0px 24px">
              <Tag margin="16px">Basketball</Tag>
              <Tag margin="16px">Pro Full court</Tag>
            </Flex> */}

            <Flex>
              <FormControl marginTop="16px">
                <FormLabel>Court Name:</FormLabel>
                <Input
                  placeholder="Court name"
                  width="240px"
                  maxLength={maxCourtNameLen}
                  onChange={checkNameLength}
                  isInvalid={courtNameLen}
                  ref={courtNameRef}
                />
                {/* {courtNameLen ? (
                  <Text color="crimson">Max 20 letters are allowed</Text>
                ) : (
                  <Text height={}> </Text>
                )} */}
                <Text color="crimson" hidden={!courtNameLen}>
                  Max 20 letters are allowed
                </Text>
              </FormControl>
              <FormControl marginTop="16px">
                <FormLabel>Publisher:</FormLabel>
                <Flex alignItems="center">
                  <Button
                    as={IconButton}
                    aria-label="User information"
                    icon={<FaUserCircle />}
                    variant="navbarIconBtn"
                    bg="background.tertiary"
                    color="brand.primary"
                    marginRight="10px"
                    isRound
                  ></Button>
                  <Text>username</Text>
                </Flex>
              </FormControl>
            </Flex>

            <FormControl marginTop="16px">
              <FormLabel>Description:</FormLabel>
              <Textarea
                placeholder="Description: maximum 200 words"
                maxLength={200}
                onChange={getTextAreaLen}
                ref={descriptionRef}
              />
            </FormControl>

            <Text fontSize="10px" right="0">
              Maximum description length: {textAreaLen}/200 words
            </Text>
          </ModalBody>

          <Flex justifyContent="space-around" margin="24px" flexWrap="wrap">
            <Button colorScheme="blue" variant="shareBtn" width="100px" onClick={submitTemplate}>
              Publish
            </Button>
            <Button onClick={onClose} width="100px">
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateTemplate;
