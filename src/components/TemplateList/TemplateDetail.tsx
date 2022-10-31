import { ITags } from "@/interfaces/template";
import {
  Button,
  Modal,
  ModalContent,
  ModalBody,
  Flex,
  Box,
  Text,
  Icon,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import CourtTags from "./CourtTags";
import Image from "next/image";
import { ISaveDesign } from "@/interfaces/design";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateItem;
  applyTemplate: () => void;
}

interface TemplateItem {
  userId: string;
  description: string | null | undefined;
  courtImgUrl: string;
  createDate: string;
  tags: ITags;
  designDetail: ISaveDesign;
}

const TemplateDetail = (prop: Props) => {
  return (
    <>
      <Modal isOpen={prop.isOpen} onClose={prop.onClose} isCentered>
        <ModalOverlay />
        <ModalContent width="480px">
          <ModalBody marginX="1rem" marginTop="2rem">
            <Box width="full" height="220px" marginBottom="1rem" position="relative">
              <Image src={prop.template.courtImgUrl} layout="fill" objectFit="contain" />
            </Box>

            <Box marginBottom="0.2rem">
              <Text color="black" fontSize="20px" fontWeight="700">
                {prop.template.designDetail.designName}
              </Text>
              <Text color="black" fontSize="12px" marginY="1.1rem">
                {prop.template.description}
              </Text>
              <Flex width="full" marginY="0.5rem" gap="2rem">
                <CourtTags tags={prop.template.tags} />
              </Flex>
            </Box>

            <Box>
              <Text fontStyle="italic" fontSize="0.8rem">
                Publisher
              </Text>
              <Flex width="60%" margin="0.5rem" alignItems="center" gap="10px">
                <Icon as={FaUserCircle} fontSize="2.5rem" />
                <Text
                  fontSize="large"
                  fontWeight="500"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {prop.template.designDetail.designer}
                </Text>
              </Flex>

              <Text fontStyle="italic" fontSize="0.8rem">
                Created at
              </Text>
              <Text fontWeight="700">{prop.template.createDate}</Text>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="space-around">
            <Button
              variant="outline"
              colorScheme="teal"
              fontSize="18px"
              onClick={prop.onClose}
              width="8rem"
            >
              Back
            </Button>
            <Button variant="shareBtn" onClick={prop.applyTemplate} width="8rem" autoFocus>
              Use
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TemplateDetail;
