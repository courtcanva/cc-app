import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { switchSideBar, switchLoginModal } from "@/store/reducer/buttonToggleSlice";
import { getDesignsData, setDefaultCourt, defaultCourt } from "@/store/reducer/courtSpecDataSlice";
import { fetchDesignData, useDeleteDesignMutation } from "@/redux/api/designApi";
import { designMapping } from "@/utils/designMapping";
import { getDesignsTileData } from "@/store/reducer/designsTileListSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import { FaTrashAlt } from "react-icons/fa";
import {
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const FolderDeleteModal = () => {
  const dispatch = useDispatch();
  const userData = useStoreSelector((state) => state.user);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);
  const useUserId = userData.userId;

  const [deleteDesign] = useDeleteDesignMutation();
  const handleDeleteDesign = async (e: { preventDefault: () => void }) => {
    dispatch(switchSideBar(false));
    e.preventDefault();
    if (useUserId === "") {
      dispatch(switchLoginModal(true));
      return;
    }
    if (selectedCourt.courtId === "") return;
    await deleteDesign(selectedCourt.courtId);
    dispatch(setDefaultCourt(defaultCourt));
    const design = await fetchDesignData(useUserId);
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedTileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedTileData));
    dispatch(changeDesignNameList(mappedNameList));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Delete Button"
        colorScheme="transparent"
        icon={
          <FaTrashAlt
            size={12}
            style={{ color: "white", marginTop: "-18px", marginLeft: "-17px", border: "none" }}
          />
        }
        // variant="editorFooterIconBtn"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} flexDirection="column" gap="10px" alignItems={"center"}>
            <FaTrashAlt
              size={35}
              style={{ color: "#9F100F", marginTop: "25px", marginBottom: "10px" }}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <p>Are you sure you want to remove this design from the folder?</p>
          </ModalBody>
          <ModalFooter display={"flex"} gap="10px" marginTop={"10px"}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="folderDeleteBtn" onClick={handleDeleteDesign}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FolderDeleteModal;
