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
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAddTemplateMutation } from "@/redux/api/templateApi";
import SuccessNotice from "./SuccessNotice";
import { generateNewTemplate } from "@/utils/generateNewTemplate";
import { userNameEllip } from "../../utils/handleLongUserName";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const maxCourtNameLen = 20;
const maxDescriptionLen = 200;
const maxUserNameDisplay = 20;
const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function CreateTemplate({ isOpen, onClose }: Props) {
  const courtNameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [courtNameFull, setCourtNameFull] = useState(false);
  const [textAreaLen, setTextAreaLen] = useState(0);
  // const [successUpload, setSuccessUpload] = useState(false);
  const { userId, firstName, lastName } = useStoreSelector((state) => state.user);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  const { court: selectedCourtTileData } = useStoreSelector((state) => state.tile.present);
  // 问下桃桃这个error到底咋搞，不想用lowb promise chain
  const [addTemplate, { error }] = useAddTemplateMutation();
  const courtType = "basketball";
  const userFullName = userNameEllip(`${firstName} ${lastName}`, maxUserNameDisplay);
  const { isOpen: open_, onOpen, onClose: close_ } = useDisclosure();

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.currentTarget.value.length;
    nameInputLen >= maxCourtNameLen ? setCourtNameFull(true) : setCourtNameFull(false);
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaLength = e.target.value
      .replace(regex, " ")
      .split(" ")
      .filter((item) => item != "").length;
    setTextAreaLen(textAreaLength);
  };

  //
  const submitTemplate = async () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    // 得加一个empty判断， 我建议把courtNameFull改成记录数字，然后加个空的判断
    if (!courtName) {
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
        // setSuccessUpload(true);
        onOpen();
      })
      .catch((err) => {
        console.log(err);
        alert(`Error Status: ${err.status}`);
      });
    onClose();
  };

  useEffect(() => {
    setCourtNameFull(false);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered>
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
              <FormControl width="50%" marginTop="1rem" isRequired isInvalid={courtNameFull}>
                <FormLabel marginBottom="1rem">Court Name:</FormLabel>
                <Input
                  role="courtNameInput"
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
                    {userFullName}
                  </Text>
                </Flex>
              </Box>
            </Flex>
            <Text color="crimson" opacity={!courtNameFull ? "0" : "100%"} fontSize="0.8rem">
              CourtName cannot have more than 20 letters
            </Text>
            {/* NOTE: 1、待讨论：要不要直接换成文字，直接插入alert 弹框会出现bug 
            2、或者直接沿用design 的name， 有现成的验证，用户可以少一次输入，同时想要修改可以在这个入口直接修改*/}
            <FormControl marginTop="1rem">
              <FormLabel marginBottom="1rem">Description:</FormLabel>
              <Textarea
                height="200px"
                placeholder={`Description: maximum ${maxDescriptionLen} words`}
                onChange={handleTextAreaLenChange}
                ref={descriptionRef}
              />
            </FormControl>

            <Text role="wordCount" color={textAreaLen < maxDescriptionLen ? "black" : "crimson"}>
              {textAreaLen}/{maxDescriptionLen} words
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
            <Button role="cancelBtn" onClick={onClose} width="100px">
              Cancel
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      <SuccessNotice isOpen={open_} onClose={close_} />
    </>
  );
}
export default CreateTemplate;
