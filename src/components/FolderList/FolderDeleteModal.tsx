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
import { deleteImage } from "@/utils/manageExternalImage";

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
    const imageUrl = selectedCourt.image;
    if (imageUrl) {
      deleteImage(imageUrl);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Delete Button"
        size="xs"
        colorScheme="transparent"
        icon={<FaTrashAlt />}
        onClick={onOpen}
        data-testid="delete-btn"
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} flexDirection="column" gap="10px" alignItems={"center"}>
            <FaTrashAlt
              size={35}
              style={{ color: "#C13D46", marginTop: "25px", marginBottom: "10px" }}
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"}>
            <p data-testid="delete-modal-text">
              Are you sure you want to remove this item from the folder list?
            </p>
          </ModalBody>
          <ModalFooter display={"flex"} gap="10px" marginTop={"10px"}>
            <Button variant="ghost" onClick={onClose} data-testid="delete-modal-close">
              Cancel
            </Button>
            <Button
              variant="deleteBtn"
              onClick={handleDeleteDesign}
              data-testid="delete-modal-confirm"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FolderDeleteModal;
