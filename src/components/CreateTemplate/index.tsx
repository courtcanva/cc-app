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
  IconButton,
  Text,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 20;
const maxDescriptionLen = 200;

function CreateTemplate(prop: Props) {
  const { isOpen, onClose } = prop;
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [courtNameFull, setCourtNameFull] = useState(false);
  const [descriptionFull, setDescriptionFull] = useState(false);
  const [textAreaLen, setTextAreaLen] = useState(0);
  const { userId } = useStoreSelector((state) => state.user);

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.target.value.length;
    if (nameInputLen >= maxCourtNameLen) {
      setCourtNameFull(true);
    } else {
      setCourtNameFull(false);
    }
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaLen(e.currentTarget.value.split(" ").length - 1);
  };

  const submitTemplate = () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    const image = "";
    const id = "";

    // tags咋办啊
  };

  useEffect(() => {
    setCourtNameFull(false);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
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
              <FormControl width="50%" marginTop="16px" isRequired isInvalid={courtNameFull}>
                <FormLabel marginBottom="16px">Court Name:</FormLabel>
                <Input
                  placeholder="Court name"
                  width="240px"
                  maxLength={maxCourtNameLen}
                  onChange={checkNameLength}
                  ref={courtNameRef}
                />
                {/* {courtNameLen ? (
                  <Text color="crimson">Max 20 letters are allowed</Text>
                ) : (
                  <Text height={}> </Text>`
                )} */}
                <Text color="crimson" visibility={!courtNameFull ? "hidden" : "visible"}>
                  Max 20 letters are allowed
                </Text>
              </FormControl>
              <Box width="50%">
                <Text margin="16px 0px" fontSize="middium" fontWeight="500">
                  Publisher:
                </Text>
                <Flex alignItems="center">
                  <Icon as={FaUserCircle} fontSize="40px" marginRight="30px" />
                  {/* User icon may need to be fetched from the database or s3 */}
                  <Text fontSize="large" fontWeight="500">
                    username
                  </Text>
                </Flex>
              </Box>
            </Flex>

            <FormControl marginTop="16px" isRequired>
              <FormLabel marginBottom="16px">Description:</FormLabel>
              <Textarea
                height="200px"
                placeholder="Description: maximum 200 words"
                onChange={handleTextAreaLenChange}
                ref={descriptionRef}
              />
            </FormControl>

            <Text>Maximum description length: {textAreaLen}/200 words</Text>
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
