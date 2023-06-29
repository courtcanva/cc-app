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
  switchSavePopover,
  switchSideBar,
} from "@/store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";
import { downloadToPDF } from "@/utils/printPDF";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import EditorDesignName from "@/components/NavBar/EditorDesignName";
import { useEffect, useState } from "react";

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
      <Flex maxW={"md"} paddingLeft={"8px"}>
        <EditorDesignName />
      </Flex>
      <Flex align="center" justify="left" marginTop="15px">
        <Popover onClose={handleSaveClose}>
          <PopoverTrigger>
            <IconButton
              aria-label="DocSvg"
              icon={<BiSave />}
              colorScheme="white"
              size="sm"
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
          isLoading={isLoading}
          aria-label="Download"
          icon={<BiDownload />}
          colorScheme="white"
          variant="navbarIconBtn"
          size="sm"
          onClick={handleDownload}
          data-testid="download-btn"
        />

        <Button
          variant="shareBtn"
          marginLeft="10px"
          size="sm"
          width={"65px"}
          fontSize="sm"
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
