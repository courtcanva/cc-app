import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { switchMyTemplateDisplay, switchMyAccount } from "@/store/reducer/buttonToggleSlice";
import { useDispatch } from "react-redux";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleLogout: () => void;
}

const Profile = ({ isOpen, onOpen, onClose, handleLogout }: Props) => {
  const disPatch = useDispatch();
  const handleOpenMyTemplate = () => {
    disPatch(switchMyTemplateDisplay(true));
    onClose();
  };
  const handleOpenMyAccount = () => {
    disPatch(switchMyAccount(true));
    onClose();
  };

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
        <MenuItem onClick={handleOpenMyAccount}>My Account</MenuItem>
        <MenuItem>My Order</MenuItem>
        <MenuItem onClick={handleOpenMyTemplate}>My Template</MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Profile;
