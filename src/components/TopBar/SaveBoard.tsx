import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";
import { Button, useToast } from "@chakra-ui/react";
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
import SaveAlert from "./SaveAlert";
import { COURT_TYPE } from "@/constants/courtData";
import { upLoadScreenshot } from "@/utils/manageExternalImage";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userData = useStoreSelector((state) => state.user);
  const courtData = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const tileData = useStoreSelector((state) => state.tile.present.court);
  const designsData = useStoreSelector((state) => state.courtSpecData.designsData);
  const designNames = useStoreSelector((state) => state.designName.nameList);
  const [nameCheck, setNameCheck] = useState("");
  const [useDesignName, setDesignName] = useState(courtData.designName);
  const [useCourtId, setCourtId] = useState(courtData.courtId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [useFeedback, setFeedback] = useState("");
  const [useSaveDesignModal, setSaveDesignModal] = useState(false);
  const courtDataUrl = useStoreSelector((state) => state.canvasControl.courtDataUrl);

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
      if (!courtDataUrl) {
        return toast({
          title: `Fail to get courtDataUrl`,
          description: "Try again or contact IT support",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      const imgUrl = await upLoadScreenshot(courtDataUrl, toast);
      await addDesign({ design: { ...designData, image: imgUrl, courtType: COURT_TYPE } })
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
      if (!courtDataUrl) {
        return toast({
          title: `Fail to get courtDataUrl`,
          description: "Try again or contact IT support",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      const imgUrl = await upLoadScreenshot(courtDataUrl, toast);
      await updateDesign({
        _id: useCourtId,
        design: { ...designData, image: imgUrl, courtType: COURT_TYPE },
      })
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

  const handleCheckName = (event: { target: { value: React.SetStateAction<string> } }) => {
    const editedName = String(event.target.value);
    if (editedName.length > DESIGN_NAME_MAX_CHAR_LENGTH) {
      setNameCheck(`The design name should less than ${DESIGN_NAME_MAX_CHAR_LENGTH} characters.`);
    } else {
      setDesignName(editedName);
      setNameCheck(checkDesignName(editedName, designNames));
    }
  };

  const handleSaveAsDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    designData.designName = useDesignName.replace(CHECK_START_END_SPACE, "");

    if (!courtDataUrl) {
      return toast({
        title: `Fail to get courtDataUrl`,
        description: "Try again or contact IT support",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
    const imgUrl = await upLoadScreenshot(courtDataUrl, toast);

    await addDesign({ design: { ...designData, image: imgUrl, courtType: COURT_TYPE } })
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
          <SaveAlert
            dialogOpen={dialogOpen}
            useDesignName={useDesignName}
            handleCheckName={handleCheckName}
            nameCheck={nameCheck}
            handleSaveAsDesign={handleSaveAsDesign}
            setDialogOpen={setDialogOpen}
            setDesignName={setDesignName}
            setNameCheck={setNameCheck}
          />
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
