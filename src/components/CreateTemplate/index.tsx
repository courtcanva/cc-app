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
import React, { ReactEventHandler, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 20;

function CreateTemplate(prop: Props) {
  const { isOpen, onClose } = prop;
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [courtNameLen, setCourtNameLen] = useState(false);

  const checkNameLength = (e: any) => {
    const nameInputLen = e.target.value.length;
    if (nameInputLen >= maxCourtNameLen) {
      setCourtNameLen(true);
    } else {
      setCourtNameLen(false);
    }
  };

  useEffect(() => {
    setCourtNameLen(false);
  }, []);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
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
                  <Text> username</Text>
                </Flex>
              </FormControl>
            </Flex>

            <FormControl marginTop="16px">
              <FormLabel>Description:</FormLabel>
              <Textarea placeholder="Description: maximum 200 words" />
            </FormControl>

            <Text fontSize="10px" right="0">
              Maximum description length: 0/200 words
            </Text>
          </ModalBody>

          <Flex justifyContent="space-around" margin="24px" flexWrap="wrap">
            <Button colorScheme="blue" variant="shareBtn" width="100px">
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
