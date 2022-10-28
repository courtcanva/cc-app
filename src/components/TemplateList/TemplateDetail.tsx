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
}

interface TemplateItem {
  userId: string;
  description: string | null | undefined;
  courtImgUrl: string;
  createDate: string;
  tags: ITags;
  designDetail: ISaveDesign;
}

const TemplateDetail = ({ isOpen, onClose, template }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent marginTop="74px" width="480px">
          <ModalBody marginX="1em" marginTop="2em">
            <Box width="full" height="220px" marginBottom="1em" position="relative">
              <Image src={template.courtImgUrl} layout="fill" objectFit="contain" />
            </Box>

            <Box marginBottom="0.2em">
              <Text color="black" fontSize="1.3em" fontWeight="700" line-height="15px">
                {template.designDetail.designName}
              </Text>
              <Text
                color="black"
                fontSize="1em"
                marginY="1.1em"
                fontWeight="400"
                line-height="15px"
              >
                {template.description}
              </Text>
              <Flex width="full" marginY="0.5em" gap="2em">
                <CourtTags tags={template.tags} />
              </Flex>
            </Box>

            <Box>
              <Text fontStyle="italic" fontSize="0.8em">
                Publisher
              </Text>
              <Flex margin="0.5em" alignItems="center" gap="10px">
                <Icon as={FaUserCircle} fontSize="2.5rem" />
                <Text
                  fontSize="large"
                  fontWeight="500"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {template.designDetail.designer}
                </Text>
              </Flex>

              <Text fontStyle="italic" fontSize="0.8em">
                Created at
              </Text>
              <Text fontWeight="700">{template.createDate}</Text>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="space-around">
            <Button variant="outline" colorScheme="teal" onClick={onClose} width="8em" autoFocus>
              Back
            </Button>
            <Button variant="shareBtn" onClick={onClose} width="8em" autoFocus>
              Use
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TemplateDetail;
