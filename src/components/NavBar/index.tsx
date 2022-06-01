import { Flex, Button, Text, IconButton, Grid, useDisclosure } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowGoBackLine, RiArrowGoForwardLine } from "react-icons/ri";
import { BiStar, BiPencil } from "react-icons/bi";
import Link from "next/link";
import HOME_PAGE_LINK from "@/constants/index";

import MContent from "../Login";

const NavigationBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid templateColumns="repeat(3, 1fr)" bg="brand.primary" p={4}>
      <Flex alignItems="center">
        <Link href={HOME_PAGE_LINK} passHref>
          <Button leftIcon={<IoIosArrowBack />} pl="0" variant="navbarIconBtn">
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="User information"
            icon={<FaRegUser />}
            variant="navbarIconBtn"
            bg="white"
            color="black"
            marginRight="10px"
            isRound
          >
            Actions
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}>log in</MenuItem>
            <MenuItem onClick={onOpen}>log up</MenuItem>
          </MenuList>
        </Menu>

        <Modal isOpen={isOpen} onClose={onClose} isCentered size={"sm"}>
          <ModalOverlay />
          <MContent />
        </Modal>

        <IconButton aria-label="Download design" icon={<FiDownload />} variant="navbarIconBtn" />
        <IconButton aria-label="Order" icon={<HiOutlineShoppingBag />} variant="navbarIconBtn" />
        <Button variant="shareBtn" marginLeft="10px" onClick={onOpen}>
          Share
        </Button>
      </Flex>
    </Grid>
  );
};

export default NavigationBar;
