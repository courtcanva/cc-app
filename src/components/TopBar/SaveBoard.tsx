import React, { useEffect, useState, useRef } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";
import {
  AlertDialogCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import {
  fetchDesignData,
  useAddDesignMutation,
  useUpdateDesignMutation,
} from "@/redux/api/designApi";
import { ITileColor } from "@/interfaces/design";
import { designMapping, saveDesignMapping } from "@/utils/designMapping";
import { useDispatch } from "react-redux";
import checkDesignName from "@/utils/checkDesignName";
import {
  changeDesignName,
  getDesignsData,
  setNewDesignActive,
} from "@/store/reducer/courtSpecDataSlice";
import { getDesignsTileData } from "@/store/reducer/designsTileListSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import { CHECK_START_END_SPACE, DESIGN_NAME_MAX_CHAR_LENGTH } from "@/constants/courtData";
import SaveDesignModal from "./SaveDesignModal";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useStoreSelector((state) => state.user);
  const courtData = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const designsData = useStoreSelector((state) => state.courtSpecData.designsData);
  const designNames = useStoreSelector((state) => state.designName.nameList);
  const cancelRef = useRef(null);
  const [nameCheck, setNameCheck] = useState<string>("");
  const [useDesignName, setDesignName] = useState(courtData.designName);
  const [useCourtId, setCourtId] = useState(courtData.courtId);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [useFeedback, setFeedback] = useState("");
  const [useSaveDesignModal, setSaveDesignModal] = useState(false);

  const tiles: ITileColor[] = [];
  for (const tile of tileData) {
    tiles.push(tile);
  }

  const mappedCourtSize = saveDesignMapping(courtData);

  useEffect(() => {
    setDesignName(courtData.designName);
    if (designNames.includes(useDesignName)) {
      const index = designsData.findIndex((item) => item.designName === useDesignName);
      setCourtId(designsData[index]?.courtId);
    } else {
      setCourtId(courtData.courtId);
    }
  }, [designNames, courtData]);

  const designData = {
    user_id: userData.userId,
    designName: useDesignName,
    tileColor: tiles,
    courtSize: mappedCourtSize,
  };

  const mappedDesignData = async (designName: string) => {
    const design = await fetchDesignData(userData.userId);
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedTileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedTileData));
    dispatch(changeDesignNameList(mappedNameList));
    dispatch(setNewDesignActive(designName));
  };

  const [addDesign] = useAddDesignMutation();
  const [updateDesign] = useUpdateDesignMutation();

  const handleSaveDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (useCourtId === "") {
      await addDesign({ design: designData })
        .unwrap()
        .then(() => {
          setFeedback("Your design has been saved.");
          setSaveDesignModal(true);
        })
        .catch(() => {
          setFeedback("Saved design failed, please try it again.");
          setSaveDesignModal(true);
        });
    } else {
      await updateDesign({ _id: useCourtId, design: designData })
        .unwrap()
        .then(() => {
          setFeedback("Your design has been updated.");
          setSaveDesignModal(true);
        })
        .catch(() => {
          setFeedback("Updated design failed, please try it again.");
          setSaveDesignModal(true);
        });
    }
    mappedDesignData(designData.designName);
  };

  const open = () => {
    setDialogOpen(true);
    setNameCheck(checkDesignName(useDesignName, designNames));
  };
  const close = () => {
    setDialogOpen(false);
    setDesignName(useDesignName);
    setNameCheck("");
  };

  const handleCheckName = (event: { target: { value: React.SetStateAction<string> } }) => {
    const editedName = String(event.target.value);
    if (editedName.length > DESIGN_NAME_MAX_CHAR_LENGTH) {
      setNameCheck(`The design name should less than ${DESIGN_NAME_MAX_CHAR_LENGTH} characters.`);
    } else {
      setDesignName(editedName);
      setNameCheck(checkDesignName(editedName.trim(), designNames));
    }
  };

  const handleSaveAsDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    designData.designName = useDesignName.replace(CHECK_START_END_SPACE, "");
    await addDesign({ design: designData })
      .unwrap()
      .then(() => {
        setFeedback("Your design has been saved.");
        setSaveDesignModal(true);
      })
      .catch(() => {
        setFeedback("Saved design failed, please try it again.");
        setSaveDesignModal(true);
      });
    setNameCheck("");
    dispatch(changeDesignName(useDesignName));
    mappedDesignData(designData.designName);
    setDialogOpen(false);
  };

  return (
    <Flex data-testid="SaveBoard">
      <Box display="flex" flexDirection="column" gap="1">
        <Button
          leftIcon={<SaveSvg />}
          aria-label="SaveSvg"
          bg="white"
          w="115px"
          h="44px"
          justifyContent="left"
          onClick={handleSaveDesign}
          data-testid="save"
        >
          Save
        </Button>
        <Button
          leftIcon={<DocSvg />}
          aria-label="DocSvg"
          bg="white"
          w="115px"
          h="44px"
          justifyContent="left"
          onClick={open}
          data-testid="sava-as"
        >
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={close}
            isOpen={dialogOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Save As</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Your design will be saved in FOLDER.
                <Text margin="5px 0">Court Name: {useDesignName}</Text>
                <Input
                  marginTop="5px"
                  value={useDesignName}
                  onChange={handleCheckName}
                  placeholder="Make your unique court name."
                />
                <Text color="crimson" marginTop="0.2rem" fontSize="0.8rem">
                  {nameCheck}
                </Text>
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={close} w="75px">
                  Cancel
                </Button>
                <Button
                  bg="button.hover"
                  color="fontcolor.primary"
                  w="75px"
                  ml={3}
                  disabled={nameCheck !== ""}
                  onClick={handleSaveAsDesign}
                  ref={cancelRef}
                  _hover={{ bg: "brand.secondary", opacity: "0.60" }}
                  _active={{ bg: "brand.secondary", opacity: "0.60" }}
                >
                  Save
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          Save as
        </Button>
      </Box>
      <SaveDesignModal
        isOpen={useSaveDesignModal}
        onClose={() => setSaveDesignModal(false)}
        updateFeedbackData={useFeedback}
      ></SaveDesignModal>
    </Flex>
  );
};

export default SaveBoard;
