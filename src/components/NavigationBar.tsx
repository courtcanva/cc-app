import { Flex, Box, Spacer, HStack, Icon, Button } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
const NavigationBar = () => {
  return (
    <Flex bg="#344C5C" padding="28px">
      <HStack>
        <Button leftIcon={<IoIosArrowBack />} bg="" color="#fff">
          Home
        </Button>
        <Button color="#fff" bg="">
          File
        </Button>
        <Box w="40px" h="40px" bg="pink.100">
          3
        </Box>
      </HStack>

      <Spacer />
      <HStack>
        <Box w="40px" h="40px" bg="yellow.200">
          1
        </Box>
        <Box w="40px" h="40px" bg="tomato">
          2
        </Box>
        <Box w="40px" h="40px" bg="pink.100">
          3
        </Box>
      </HStack>
      <Spacer />
      <HStack>
        <Icon as={FaUserCircle} w="45px" h="45px" color="#fff" />
        <Icon as={FiDownload} w="21px" h="21px" color="#fff" />
        <Icon as={HiOutlineShoppingBag} w="21px" h="21px" color="#fff" />
        <Button bg="#40B484" color="#fff">
          Share
        </Button>
      </HStack>
    </Flex>
  );
};
export default NavigationBar;
