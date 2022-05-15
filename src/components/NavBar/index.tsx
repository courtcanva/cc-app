import { Flex, Button, Text, IconButton, Grid, Menu, MenuButton } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BiStar, BiPencil } from "react-icons/bi";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" bg="brand.primary" p={4}>
      <Flex alignItems="center">
        <Link href="https://courtcanva.com/" passHref>
          <Button leftIcon={<IoIosArrowBack />} pl="0" variant="navbarIconBtn" >
            Home
          </Button>
        </Link>
        <Menu>
          <MenuButton as={Button} variant="navbarIconBtn">
            File
          </MenuButton>
        </Menu>
        <Flex flex="1" justifyContent="center">
          <IconButton
            aria-label="Revert edit"
            icon={<RiArrowGoBackLine />}
            variant="navbarIconBtn"
          />
          <IconButton
            aria-label="Forward edit"
            icon={<RiArrowGoForwardLine />}
            variant="navbarIconBtn"
            color="#72818B"
          />
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <IconButton aria-label="Star" icon={<BiStar />} variant="navbarIconBtn" />
        <Text color="white" fontSize="xl">
          CourtCanva1
        </Text>
        <IconButton aria-label="Edit" icon={<BiPencil />} variant="navbarIconBtn" />
      </Flex>
      <Flex alignItems="center" justifyContent="flex-end">
        <IconButton
          aria-label="User information"
          icon={<FaRegUser />}
          variant="navbarIconBtn"
          bg="white"
          color="black"
          marginRight="10px"
          isRound
        />
        <IconButton aria-label="Download design" icon={<FiDownload />} variant="navbarIconBtn" />
        <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
        <Button variant="shareBtn" marginLeft="10px">
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
