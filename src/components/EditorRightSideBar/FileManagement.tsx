import { getCourtNameString } from "@/store/reducer/courtSpecDataSlice";
import { useStoreSelector } from "@/store/hooks";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import SaveBoard from "@/components/TopBar/SaveBoard";
import { BiDownload, BiSave } from "react-icons/bi";
import {
  switchCreateTemplate,
  switchLoginModal,
  switchPaintBucket,
  switchSavePopover,
  switchSideBar,
} from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { downloadToPDF } from "@/utils/printPDF";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditorDesignName from "@/components/NavBar/EditorDesignName";

const FileManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const userData = useStoreSelector((state) => state.user);
  const { isPaintPopoverOpen, isSavePopoverOpen } = useStoreSelector((state) => state.buttonToggle);
  const { activeCourt: selectedCourt } = useStoreSelector((state) => state.courtSpecData);

  const borderLength = selectedCourt.borderLength;
  const [sliderValue, setSliderValue] = useState(borderLength / 1000);
  const [useUserId, setUserId] = useState(userData.userId);

  const [loginState, setLoginState] = useState(false);
  const handleCreateTemplateOpen = () => {
    router.push("/");
    dispatch(switchCreateTemplate(true));
  };

  const handleLoginModalOpen = () => {
    dispatch(switchLoginModal(true));
  };

  useEffect(() => {
    setSliderValue(borderLength / 1000);
    setUserId(userData.userId);
  }, [borderLength, userData]);

  const handleDownload = () => {
    dispatch(switchSideBar(false));
    dispatch(resetAll());
    const downloadTimer = setTimeout(() => {
      downloadToPDF();
      clearTimeout(downloadTimer);
    }, 500);
  };

  const handleSaveOpen = () => {
    useUserId ? dispatch(switchSavePopover(true)) : dispatch(switchLoginModal(true));
  };

  const handleSaveClose = () => {
    dispatch(switchSavePopover(false));
  };
  return (
    <Box>
      <Flex maxW={"md"} paddingLeft={"8px"}>
        <EditorDesignName />
      </Flex>
      <Flex align="center" justify="flex-start" gap="15px">
        <Popover isOpen={isSavePopoverOpen} onClose={handleSaveClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="DocSvg"
              icon={<BiSave />}
              colorScheme="white"
              size="md"
              variant="navbarIconBtn"
              onClick={handleSaveOpen}
              data-testid="save-btn"
            />
          </PopoverTrigger>
          <PopoverContent w="140px" h="110px">
            <PopoverBody>
              <SaveBoard />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          aria-label="Download"
          icon={<BiDownload />}
          colorScheme="white"
          variant="navbarIconBtn"
          size="md"
          onClick={handleDownload}
          data-testid="download-btn"
        />

        <Button
          variant="shareBtn"
          marginLeft="2px"
          size="xs"
          fontSize="sm"
          onClick={loginState ? handleCreateTemplateOpen : handleLoginModalOpen}
          data-testid="share-btn"
        >
          Share
        </Button>
      </Flex>
    </Box>
  );
};

export default FileManagement;
