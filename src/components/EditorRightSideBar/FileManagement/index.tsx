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
import SaveBoard from "@/components/EditorRightSideBar/FileManagement/SaveBoard";
import {
  switchCreateTemplate,
  switchLoginModal,
  switchSavePopover,
  switchSideBar,
} from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { downloadToPDF } from "@/utils/printPDF";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import EditorDesignName from "@/components/EditorRightSideBar/FileManagement/EditorDesignName";
import { useEffect, useState } from "react";
import SaveSVG from "@/assets/svg/RightBarSvg/save.svg";
import DownloadSVG from "@/assets/svg/RightBarSvg/download.svg";

const FileManagement = () => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const userId = useStoreSelector((state) => state.user.userId);

  const handleCreateTemplateOpen = () => {
    router.push("/");
    dispatch(switchCreateTemplate(true));
  };

  const handleLoginModalOpen = () => {
    dispatch(switchLoginModal(true));
  };

  const handleDownload = async () => {
    dispatch(switchSideBar(false));
    dispatch(resetAll());
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        downloadToPDF();
      }, 0);
    }
  }, [isLoading]);

  const handleSaveOpen = () => {
    userId ? dispatch(switchSavePopover(true)) : dispatch(switchLoginModal(true));
  };

  const handleSaveClose = () => {
    dispatch(switchSavePopover(false));
  };
  return (
    <Box>
      <Flex maxW={"md"}>
        <EditorDesignName />
      </Flex>
      <Flex marginTop="16px">
        <Popover onClose={handleSaveClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="DocSvg"
              icon={<SaveSVG />}
              colorScheme="white"
              size="sm"
              variant="navbarIconBtn"
              onClick={handleSaveOpen}
              data-testid="save-btn"
              ml="-7px"
            />
          </PopoverTrigger>
          <PopoverContent w="140px" h="110px">
            <PopoverBody>
              <SaveBoard />
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton
          isLoading={isLoading}
          aria-label="Download"
          icon={<DownloadSVG />}
          colorScheme="white"
          variant="navbarIconBtn"
          size="sm"
          onClick={handleDownload}
          data-testid="download-btn"
          ml="6px"
        />

        <Button
          variant="shareBtn"
          marginLeft="13px"
          mt="4px"
          size="sm"
          w="60px"
          h="24px"
          fontSize="12px"
          fontWeight="700"
          onClick={userId ? handleCreateTemplateOpen : handleLoginModalOpen}
          data-testid="share-btn"
        >
          Share
        </Button>
      </Flex>
    </Box>
  );
};

export default FileManagement;
