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
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAddTemplateMutation, useGetTemplatesQuery } from "@/redux/api/templateApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { ITemplate } from "@/interfaces/template";
import { saveDesignMapping } from "@/utils/designMapping";
import { IDesign } from "@/interfaces/design";

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
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  const { court: selectedCourtTileData } = useStoreSelector((state) => state.tile.present);
  const [ addTemplate ] = useAddTemplateMutation();
  // 别在意这个，后面我会删的
  // const { data, isSuccess } = useGetTemplatesQuery("123456");
  const courtType = "basketball";

  const checkNameLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameInputLen = e.currentTarget.value.length;
    nameInputLen >= maxCourtNameLen ? setCourtNameFull(true) : setCourtNameFull(false);
  };

  const handleTextAreaLenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaLength = e.target.value
      .trim()
      .replace(regex, " ")
      .split(" ")
      .filter((item) => item != "").length;
    setTextAreaLen(textAreaLength);
  };

  // 需要的话可以打个包丢util，但是我懒，还要写测试 :(
  const packNewTemplate = (name: string, description: string | undefined): ITemplate => {
    const courtSizeData = saveDesignMapping(selectedCourt);
    const tiles = selectedCourtTileData;
    const selectedCourtCategory = selectedCourt.courtName.replace(" ", "");
    console.log(selectedCourtCategory);

    const newDesign: IDesign = {
      _id: "看这里！！！！！！！！",
      user_id: "你开心的话重新写一个interface, 把这user_id去掉, 再加个designer: string, 不改也无所谓",
      designName: name,
      tileColor: tiles,
      courtSize: courtSizeData,
    };

    const newTemplate: ITemplate = {
      _id: "还有个问题, 我这边create template的pop up window太大了, 顶上标题都被遮住了",
      user_id: userId,
      description,
      design: newDesign,
      image: "image_url",
      tags: {
        CourtCategory: selectedCourtCategory,
        CourtType: courtType,
      },
    };
    return newTemplate;
  };

  // 想下怎么处理error和result吧
  const submitTemplate = async () => {
    const courtName = courtNameRef.current?.value;
    const description = descriptionRef.current?.value;
    if (courtName) {
      const packedTemplate = packNewTemplate(courtName, description);
      try {
        const returned = await addTemplate(packedTemplate);
        console.log(returned);
      } catch(err) {
        console.log(err)
        alert("寄啦~");
        return;
      }
      onClose();
      const timer = setTimeout(() => alert("成功啦,去你数据库看看吧"), 800);
      clearTimeout(timer);
    }
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

            <Flex padding="0px 24px">
              <Badge margin="16px" colorScheme="green">
                {courtType}
              </Badge>
              <Badge margin="16px">{selectedCourt.courtName}</Badge>
            </Flex>

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
