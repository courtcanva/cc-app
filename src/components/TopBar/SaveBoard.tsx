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
import checkName from "@/utils/checkName";
import {
  changeDesignName,
  defaultCourt,
  getDesignsData,
  setNewDesignActive,
} from "@/store/reducer/courtSpecDataSlice";
import { getDesignsTileData } from "@/store/reducer/designsTileListSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";
import errorMessage from "@/utils/setNameErrorMessage";
import { CHECK_START_END_SPACE } from "@/constants/courtData";
import SaveDesignModal from "./SaveDesignModal";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useStoreSelector((state) => state.user);
  const courtData = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const designsData = useStoreSelector((state) => state.courtSpecData.designsData);
  const designNames = useStoreSelector((state) => state.designName.nameList);
  const cancelRef = useRef(null);
  const [nameCheck, setNameCheck] = useState<string>("exsited");
  const [useDesignName, setDesignName] = useState(courtData.designName);
  const [useCourtId, setCourtId] = useState(courtData.courtId);
  const [useUserId, setUserId] = useState("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [useNameError, setNameError] = useState("");
  const [useFeedback, setFeedback] = useState("");
  const [useSaveDesignModal, setSaveDesignModal] = useState(false);

  const tiles: ITileColor[] = [];
  for (const tile of tileData) {
    tiles.push(tile);
  }

  const mappedcourtSize = saveDesignMapping(courtData);

  useEffect(() => {
    setUserId(userData.userId);
    const nameCheck = checkName(courtData.designName, designNames);
    setNameCheck(nameCheck);
    setDesignName(courtData.designName);
    if (courtData.courtId === "" && nameCheck === "existed") {
      const index = designsData.findIndex((item) => item.designName === defaultCourt.designName);
      setCourtId(designsData[index]?.courtId);
      return;
    }
    setCourtId(courtData.courtId);
  }, [designNames, courtData, userData]);

  const designData = {
    user_id: useUserId,
    designName: useDesignName,
    tileColor: tiles,
    courtSize: mappedcourtSize,
  };

  const mappedDesignData = async (designName: string) => {
    const design = await fetchDesignData(useUserId);
    if (design.data === undefined) return;
    const { mappedDesignsData, mappedtileData, mappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedtileData));
    dispatch(changeDesignNameList(mappedNameList));
    dispatch(setNewDesignActive(designName));
  };

  const [addDesign] = useAddDesignMutation();
  const [updateDesign] = useUpdateDesignMutation();

  const handleSaveDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (nameCheck === "existed") {
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
    if (nameCheck === "passCheck") {
      if (courtData.courtId === "") {
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
        setNameCheck("existed");
      }
      if (courtData.courtId !== "") {
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
    }
    mappedDesignData(designData.designName);
  };

  const open = () => {
    setDialogOpen(true);
    const nameCheck = checkName(useDesignName, designNames);
    setNameCheck(nameCheck);
    setNameError(errorMessage(nameCheck));
  };
  const close = () => {
    setDialogOpen(false);
    setDesignName(courtData.designName);
    setNameCheck("existed");
  };

  const handleCheckName = (event: { target: { value: React.SetStateAction<string> } }) => {
    const editedName = String(event.target.value);
    setDesignName(event.target.value);
    const nameCheck = checkName(editedName, designNames);
    setNameCheck(nameCheck);
    setNameError(errorMessage(nameCheck));
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
    setNameCheck("existed");
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
                <Text margin="5px 0">
                  Court Name: {useDesignName}
                  {useNameError}
                </Text>
                <Input
                  marginTop="5px"
                  value={useDesignName}
                  onChange={handleCheckName}
                  placeholder="Make your unique court name."
                />
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
                  disabled={nameCheck === "passCheck" ? false : true}
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
