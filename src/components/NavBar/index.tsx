import { Flex, Spacer, HStack, Button, Text, IconButton } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BiStar, BiPencil } from "react-icons/bi";

const NavigationBar = () => {
  return (
    <Flex bg="brand.primary" padding="28px">
      <Flex alignItems="center">
        <Button
          leftIcon={<IoIosArrowBack />}
          bg=""
          color="white"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        >
          Home
        </Button>
        <Button
          color="white"
          bg=""
          marginRight="123.5px"
          marginLeft="64px"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        >
          File
        </Button>
        <HStack>
          <IconButton
            aria-label="Revert edit"
            icon={<RiArrowGoBackLine />}
            bg=""
            color="white"
            fontSize="22px"
            _hover={{ bg: "#496A80" }}
          />
          <IconButton
            aria-label="Forward edit"
            icon={<RiArrowGoForwardLine />}
            bg=""
            color="#72818B"
            fontSize="22px"
            _hover={{ bg: "#496A80" }}
          />
        </HStack>
      </Flex>

      <Spacer />
      <HStack>
        <IconButton
          aria-label="Star"
          icon={<BiStar />}
          bg=""
          color="white"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        />
        <Text color="white" fontSize="22px">
          CourtCanva1
        </Text>
        <IconButton
          aria-label="Edit"
          icon={<BiPencil />}
          bg=""
          color="white"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        />
      </HStack>

      <Spacer />
      <Flex alignItems="center">
        <IconButton
          aria-label="User information"
          icon={<FaRegUser />}
          bg="white"
          color="black"
          fontSize="22px"
          marginRight="10px"
          isRound
        />
        <IconButton
          aria-label="Download design"
          icon={<FiDownload />}
          bg=""
          color="white"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        />
        <IconButton
          aria-label="Order"
          icon={<HiOutlineShoppingBag />}
          bg=""
          color="white"
          fontSize="22px"
          _hover={{ bg: "#496A80" }}
        />
        <Button
          bg="brand.secondary"
          color="white"
          width="130px"
          height="45px"
          marginLeft="10px"
          fontSize="22px"
        >
          Share
        </Button>
      </Flex>
    </Flex>
  );
};
export default NavigationBar;
