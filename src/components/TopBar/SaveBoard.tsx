import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";
import { useRef } from "react";
import { AlertDialogCloseButton, Button } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { getDesignData, useAddDesignMutation, useUpdateDesignMutation } from "@/redux/api/designApi";
import { ITileColor } from "@/interfaces/design";
import { designMapping, saveDesignMapping } from "@/utils/designMapping";
import { useDispatch } from "react-redux";
import checkName from "@/utils/checkName";
import { changeDesignName, getDesignsData } from "@/store/reducer/courtSpecDataSlice";
import { getDesignsTileData } from "@/store/reducer/tileSlice";
import { changeDesignNameList } from "@/store/reducer/designNameSlice";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const courtData = useStoreSelector((state) => state.courtSpecData.activeCourt);
  const tileData = useStoreSelector((state) => state.tile.present);
  const designNames = useStoreSelector((state) => state.designName.nameList);
  const cancelRef = useRef(null);
  const [nameCheck, setNameCheck] = useState<string>("exsited");
  const [useDesignName, setDesignName] = useState(courtData.designName);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [useNameError, setNameError] = useState("");

  const tiles: ITileColor[] = [];
  for (const tile of tileData.court) {
    tiles.push(tile);
  }
  const mappedcourtSize = saveDesignMapping(courtData);

  useEffect(() => {
    const nameCheck = checkName(courtData.designName, designNames);
    setNameCheck(nameCheck);
  }, [designNames, courtData.designName]);

  const designData = {
    user_id: "user123",
    designName: courtData.designName,
    tileColor: tiles,
    courtSize: mappedcourtSize,
  }
  
  const errorMessage = (nameCheck: string) => {
    switch (nameCheck) {
      case "existed":
        return " is already existed.";
      case "blank":
        return "Please enter a name.";
      case "incorrect":
        return " is a incorrect name type.";
      case "passCheck":
        return "";
      default:
        return " is already existed.";
    }
  };
  
  const mappedDesignData = async () => {
    const design = await getDesignData("user123");
    const { mappedDesignsData, mappedtileData, MappedNameList } = designMapping(design.data);
    dispatch(getDesignsData(mappedDesignsData));
    dispatch(getDesignsTileData(mappedtileData));
    dispatch(changeDesignNameList(MappedNameList));
  };

  const [addDesign] = useAddDesignMutation();
  const [updateDesign] = useUpdateDesignMutation();

  const handleSaveDesign = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (nameCheck === "existed" || nameCheck === "passCheck") {
      nameCheck === "existed"
        ? await updateDesign({ _id: courtData.courtId, design: designData })
        : await addDesign({ design: designData });
    }
    setNameCheck("existed");
    mappedDesignData();
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
    designData.designName = useDesignName;
    await addDesign({ design: designData });
    setNameCheck("existed");
    dispatch(changeDesignName(useDesignName));
    mappedDesignData();
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
                  value={useDesignName}
                  onChange={handleCheckName}
                  placeholder="Make your unique court name."
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={close}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  disabled={nameCheck === "passCheck" ? false : true}
                  onClick={handleSaveAsDesign}
                  ref={cancelRef}
                >
                  Save
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          Save as
        </Button>
      </Box>
    </Flex>
  );
};

export default SaveBoard;
