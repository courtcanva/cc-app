import { ITemplateDataDb } from "@/interfaces/template";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  Box,
  Text,
  Icon,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import CourtTags from "./CourtTags";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template: Omit<ITemplateDataDb, "__v" | "isDeleted">;
}

const TemplateDetail = ({ isOpen, onClose, template }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        {/* <ModalOverlay /> */}
        <ModalContent marginTop="30vh">
          <ModalHeader fontSize="2xl">{template.design.designName}</ModalHeader>
          <ModalBody>
            <Flex>
              <Box marginRight="1em" width="80%">
                <Text fontSize="lg" fontWeight="bold">
                  Description:
                </Text>
                <Text fontSize="lg">
                  {template.description
                    ? template.description
                    : "Creater is too lazy to write a discription."}
                </Text>
              </Box>
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  Publisher:
                </Text>
                <Flex margin="0.5em">
                  <Icon as={FaUserCircle} fontSize="2.5rem" marginRight="1.8rem" />
                  <Text
                    fontSize="large"
                    fontWeight="500"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {"Anonymous"}
                  </Text>
                </Flex>
                <Box width="100%" margin="0">
                  <CourtTags tags={template.tags} />
                </Box>
                <Text fontSize="lg" fontWeight="bold">
                  Create at:
                </Text>
                <Text fontSize="lg" fontWeight="500">
                  {template.createdAt.split("T")[0]}
                </Text>
              </Box>
            </Flex>
          </ModalBody>

          <Button variant="shareBtn" onClick={onClose} width="8em" margin="1em auto">
            Use
          </Button>
        </ModalContent>
      </Modal>
    </>
  );
};
export default TemplateDetail;
