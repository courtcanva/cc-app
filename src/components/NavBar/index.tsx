import { Flex, Button, Text, IconButton, Grid } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BiStar, BiPencil } from "react-icons/bi";

const NavigationBar = (): JSX.Element => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" bg="brand.primary" p={4}>
      <Flex alignItems="center">
        <Button
          leftIcon={<IoIosArrowBack />}
          pl="0"
          bg=""
          size="sm"
          color="white"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
          data-testid="home"
        >
          Home
        </Button>
        <Button
          color="white"
          bg=""
          size="sm"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
          data-testid="file"
        >
          File
        </Button>
        <Flex flex="1" justifyContent="center">
          <IconButton
            aria-label="Revert edit"
            icon={<RiArrowGoBackLine />}
            bg=""
            size="sm"
            color="white"
            fontSize="xl"
            _hover={{ bg: "#496A80" }}
          />
          <IconButton
            aria-label="Forward edit"
            icon={<RiArrowGoForwardLine />}
            bg=""
            size="sm"
            color="#72818B"
            fontSize="xl"
            _hover={{ bg: "#496A80" }}
          />
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <IconButton
          aria-label="Star"
          icon={<BiStar />}
          bg=""
          size="sm"
          color="white"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
        />
        <Text color="white" fontSize="xl">
          CourtCanva1
        </Text>
        <IconButton
          aria-label="Edit"
          icon={<BiPencil />}
          bg=""
          size="sm"
          color="white"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
        />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end">
        <IconButton
          aria-label="User information"
          icon={<FaRegUser />}
          bg="white"
          color="black"
          fontSize="xl"
          marginRight="10px"
          isRound
        />
        <IconButton
          aria-label="Download design"
          icon={<FiDownload />}
          bg=""
          size="sm"
          color="white"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
        />
        <IconButton
          aria-label="Order"
          icon={<HiOutlineShoppingBag />}
          bg=""
          size="sm"
          color="white"
          fontSize="xl"
          _hover={{ bg: "#496A80" }}
        />
        <Button
          bg="brand.secondary"
          color="white"
          width="130px"
          height="45px"
          marginLeft="10px"
          fontSize="xl"
          data-testid="share"
        >
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
