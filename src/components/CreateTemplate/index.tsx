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
  Alert,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 20;
const maxDescriptionLen = 200;
// 目前只支持英语
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function CreateTemplate(prop: Props) {
  const { isOpen, onClose } = prop;
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [courtNameFull, setCourtNameFull] = useState(false);
  const [textAreaLen, setTextAreaLen] = useState(0);
  const { userId, firstName, lastName } = useStoreSelector((state) => state.user);

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.currentTarget.value.length;
    nameInputLen >= maxCourtNameLen ? setCourtNameFull(true) : setCourtNameFull(false);
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaLength = e.target.value.length;
    // .trim()
    // .replace(regex, " ")
    // .split(" ")
    // .filter((item) => item != "").length;
    setTextAreaLen(textAreaLength);
  };

  const submitTemplate = () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    const image = ""; // 等大王PR
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
              <FormControl width="50%" marginTop="1rem" isRequired isInvalid={courtNameFull}>
                <FormLabel marginBottom="1rem">Court Name:</FormLabel>
                <Input
                  placeholder="Court name"
                  width="240px"
                  maxLength={maxCourtNameLen}
                  onChange={checkNameLength}
                  ref={courtNameRef}
                />
              </FormControl>
              <Box width="50%">
                <Text margin="16px 0px" fontSize="middium" fontWeight="500">
                  Publisher:
                </Text>
                <Flex alignItems="center">
                  <Icon as={FaUserCircle} fontSize="40px" marginRight="30px" />
                  {/* User icon may need to be fetched from the database or s3 */}
                  {/* 想想名字太长咋办 */}
                  <Text fontSize="large" fontWeight="500">
                    {`${firstName} ${lastName}`}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Text color="crimson" opacity={!courtNameFull ? "0" : "100%"} fontSize="0.8rem">
              CourtName cannot have more than 20 letters
            </Text>
            {/* NOTE: 1、待讨论：要不要直接换成文字，直接插入alert 弹框会出现bug 
            2、或者直接沿用design 的name， 有现成的验证，用户可以少一次输入，同时想要修改可以在这个入口直接修改*/}
            {/* <Alert
              status="error"
              marginTop="16px"
              variant="left-accent"
              gap="15px"
              width="60%"
              display={!courtNameFull ? "none" : "flex"}
            >
              <IoMdAlert color="crimson" fontSize="24px" />
              Reach the maximum length of 20 letters
            </Alert> */}

            <FormControl marginTop="1rem">
              <FormLabel marginBottom="1rem">Description:</FormLabel>
              <Textarea
                height="200px"
                placeholder={`Description: maximum ${maxDescriptionLen} words`}
                onChange={handleTextAreaLenChange}
                ref={descriptionRef}
              />
            </FormControl>

            <Text color={textAreaLen < maxDescriptionLen ? "black" : "crimson"}>
              {textAreaLen}/{maxDescriptionLen} words
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
