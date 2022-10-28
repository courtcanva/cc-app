import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { PROFILE_LISTS } from "@/constants/profileLists";
import { BiChevronDown } from "react-icons/bi";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleLogout: () => void;
}

const Profile = ({ isOpen, onOpen, onClose, handleLogout }: Props) => {
  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        aria-label="User information"
        background="background.tertiary"
        color="brand.primary"
        marginRight="10px"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        width="40px"
        height="40px"
        borderRadius="50%"
      >
        <Flex paddingLeft="5px">
          <FaRegUser />
          <BiChevronDown />
        </Flex>
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose} position="absolute" left="-44px">
        {PROFILE_LISTS.map((item) => (
          <MenuItem key={item}>{item}</MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
