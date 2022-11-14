import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import PROFILE_LISTS from "@/constants/profileLists";
import { BiChevronDown } from "react-icons/bi";
import {
  switchMyTemplateDisplay,
  switchMyAccount,
  switchCreateTemplate,
} from "@/store/reducer/buttonToggleSlice";
import { userData } from "@/store/reducer/userSlice";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  handleLogout: () => void;
}

const Profile = ({ isOpen, onOpen, onClose, handleLogout }: Props) => {
  const currentUserId = useStoreSelector(userData).userId;
  const disPatch = useDispatch();
  const router = useRouter();
  const onClickHandler = (title: string) => {
    switch (title) {
      case "My Account":
        router.push("/");
        disPatch(switchMyAccount(true));
        onClose();
        return;
      case "My Order":
        router.push(`/my_order?user_id=${currentUserId}`);
        onClose();
        return;
      case "My Template":
        router.push("/");
        disPatch(switchMyTemplateDisplay(true));
        onClose();
        return;
      case "Sign Out":
        router.push("/");
        disPatch(switchMyAccount(false));
        disPatch(switchMyTemplateDisplay(false));
        handleLogout();
        onClose();

        return;
      default:
        return;
    }
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
        {PROFILE_LISTS.map((item) => (
          <MenuItem key={item.title} onClick={() => onClickHandler(item.title)}>
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Profile;
