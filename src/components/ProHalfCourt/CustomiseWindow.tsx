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
  FormHelperText,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiChevronDown, BiChevronUp, BiPencil } from "react-icons/bi";
const CustomiseWindow = ({
  setInputWidth,
  setInputLength,
}: {
  setInputWidth: React.Dispatch<React.SetStateAction<number>>;
  setInputLength: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [widthValue, setWidthValue] = useState(-1);
  const [lengthValue, setLengthValue] = useState(-1);
  const [isValid, setIsValid] = useState(true);

  const inRange = (number: number, maxNum: number, minNum: number): boolean => {
    return Math.min(maxNum, minNum) <= number && Math.max(maxNum, minNum) >= number;
  };
  const handleInput = () => {
    inRange(widthValue, 14, 2) && inRange(lengthValue, 15, 2)
      ? (setIsValid(true), setInputWidth(widthValue), setInputLength(lengthValue))
      : setIsValid(false);
  };

  const resetHandle = () => {
    setWidthValue(-1);
    setLengthValue(-1);
    setInputWidth(0);
    setInputLength(0);
    setIsValid(true);
  };

  const enterPress = (event: any) => {
    if (event.key === "Enter" && widthValue !== -1 && lengthValue !== -1) {
      event.preventDefault();
      handleInput();
    }
  };

  const inputWidthBlur = () => {
    inRange(widthValue, 14, 2) || widthValue === -1 ? setIsValid(true) : setIsValid(false);
  };
  const inputHeightBlur = () => {
    inRange(lengthValue, 15, 2) || lengthValue === -1 ? setIsValid(true) : setIsValid(false);
  };
  return (
    <Box position="fixed" right={0} bottom="104px" cursor="default" width="20vw" minWidth="280px">
      <Flex
        backgroundColor="background.primary"
        width="100%"
        height="5vh"
        padding={5}
        alignItems="center"
        fontSize="xl"
        onClick={onToggle}
        cursor="pointer"
        borderTopRadius={8}
        data-testid="headWindow"
      >
        <Icon as={BiPencil} color="white" marginRight="5" width={6} height={6} />
        <Text color="white" fontWeight="bold">
          Customized
        </Text>
        <Spacer />
        <Icon as={isOpen ? BiChevronDown : BiChevronUp} color="white" width={6} height={6} />
      </Flex>
      <Collapse in={isOpen} animateOpacity data-testid="bodyWindow">
        <Flex
          direction="column"
          width="100%"
          padding={5}
          height={366}
          borderLeft="1px solid #2C4E8A"
          backgroundColor="white"
        >
          <FormControl isRequired colorScheme="blackAlpha" paddingBottom={3}>
            <FormLabel color="black">Width</FormLabel>
            <Input
              variant="filled"
              marginBottom={3}
              value={widthValue === -1 ? "" : widthValue}
              onChange={(e) => {
                e.target.value ? setWidthValue(Number(e.target.value)) : setWidthValue(-1);
              }}
              type="number"
              onKeyPress={enterPress}
              onBlur={inputWidthBlur}
              data-testid="WidthInput"
            />
            <FormLabel color="black">Length</FormLabel>
            <Input
              variant="filled"
              value={lengthValue === -1 ? "" : lengthValue}
              onChange={(e) => {
                e.target.value ? setLengthValue(Number(e.target.value)) : setLengthValue(-1);
              }}
              type="number"
              onKeyPress={enterPress}
              onBlur={inputHeightBlur}
              marginBottom={2}
              data-testid="LengthInput"
            />
            {!isValid && (
              <FormHelperText width="100%" color="red">
                Width must be between 2m and 14m and length must be between 2m and 15m.
              </FormHelperText>
            )}
          </FormControl>
          <Spacer />
          <Stack direction="column" spacing={5}>
            <Button
              variant="shareBtn"
              width="100%"
              isDisabled={widthValue === -1 || lengthValue === -1}
              onClick={handleInput}
              data-testid="setBtn"
            >
              Set
            </Button>
            <Button
              color="brand.secondary"
              borderColor="brand.secondary"
              _hover={{ color: "fontcolor.quaternary" }}
              border="1px"
              width="100%"
              onClick={resetHandle}
              data-testid="resetBtn"
            >
              Reset
            </Button>
          </Stack>
        </Flex>
      </Collapse>
    </Box>
  );
};

export default CustomiseWindow;
