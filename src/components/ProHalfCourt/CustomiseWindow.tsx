import {
  Box,
  Button,
  Collapse,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Spacer,
  useDisclosure,
  Text,
  ButtonGroup,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiPencil } from "react-icons/bi";
// inputWidth={clipWidth} setInputWidth={setClipWidth} inputLength = {clipLength} setInputLength={setClipLength
const CustomiseWindow = ({ setInputWidth, setInputLength }: any) => {
  const { isOpen, onToggle } = useDisclosure();

  const [widthValue, setWidthValue] = useState("");
  const [hightValue, setHightValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInput = () => {
    if (Number(widthValue) < 2 || Number(hightValue) < 2) {
      setIsValid(false);
    } else if (Number(widthValue) > 14 || Number(hightValue) > 15) {
      setIsValid(false);
    } else {
      setIsValid(true);
      setInputWidth(widthValue);
      setInputLength(hightValue);
    }
  };
  const resetHandle = () => {
    setWidthValue("");
    setHightValue("");
    setInputWidth("");
    setInputLength("");
    setIsValid(true);
  };
  return (
    <Box position="fixed" right={0} bottom="109px">
      <Flex
        backgroundColor="#2C4E8A"
        width="20vw"
        height="5vh"
        zIndex="2"
        padding="5"
        alignItems="center"
        fontSize="xl"
        onClick={onToggle}
        cursor="pointer"
        borderTopRadius={8}
      >
        <Icon as={BiPencil} color="white" marginRight="5" width={6} height={6} />
        <Text color="white" fontWeight="bold">
          Customized
        </Text>
        <Spacer />
        <Icon as={isOpen ? BiChevronDown : BiChevronUp} color="white" width={6} height={6} />
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="column"
          width="20vw"
          padding={5}
          border="1px solid #2C4E8A"
          height={360}
          backgroundColor="white"
        >
          <FormControl isRequired colorScheme="blackAlpha">
            <FormLabel color="black">Width</FormLabel>
            <Input
              variant="filled"
              marginBottom={8}
              value={widthValue}
              onChange={(e) => {
                setWidthValue(e.target.value);
              }}
              type="number"
            />
            <FormLabel color="black">Length</FormLabel>
            <Input
              variant="filled"
              value={hightValue}
              onChange={(e) => {
                setHightValue(e.target.value);
              }}
              type="number"
            />
            {!isValid && (
              <FormHelperText width="100%" color="red">
                Width must be between 2m and 14 and Length must be between 2m and 15m.{" "}
              </FormHelperText>
            )}
          </FormControl>
          <Spacer />
          <ButtonGroup flexDirection="column" gap={5} alignItems="center">
            <Button
              colorScheme="blue"
              width="100%"
              isDisabled={widthValue === "" || hightValue === ""}
              onClick={handleInput}
            >
              Set
            </Button>
            <Button colorScheme="blue" width="100%" onClick={resetHandle}>
              Reset
            </Button>
          </ButtonGroup>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default CustomiseWindow;
