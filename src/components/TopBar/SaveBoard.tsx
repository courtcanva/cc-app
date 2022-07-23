import React, { useEffect, useState } from "react";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";
import { useRef } from "react";
import { AlertDialogCloseButton, Button, useDisclosure } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useStoreSelector } from "@/store/hooks";
import { useAddDesignMutation, useGetDesignQuery, useUpdateDesignMutation } from "@/redux/api/designApi";
import { IDesign, ITileColor } from "@/interfaces/design";
import { designCourtMapping, saveDesignMapping } from "@/utils/designMapping";
import { changeDesignName } from "@/store/reducer/courtSizeSlice";
import { useDispatch } from "react-redux";
import checkName from "@/utils/checkName";
import { addDesignNames, changeDesignNames } from "@/store/reducer/designNameSlice";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetDesignQuery("user123");
  useEffect(() => {
    if (data === undefined) return;
    const mappedCourtData = data.map((item: IDesign) => designCourtMapping(item));
    const names: string[] = [];
    for (const courtData of mappedCourtData) {
      names.push(courtData.designName);
    }
    dispatch(changeDesignNames(names));
  }, [data]);

  const tileData = useStoreSelector((state) => state.tile.present);
  const designNames = useStoreSelector((state) => state.designName.nameList);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const courtData = useStoreSelector((state) => state.courtSpecData.activeCourt);
  console.log(designNames);
  const [nameExist, setNameExist] = useState<boolean>(false);

  const tiles: ITileColor[] = [];
    for (const tile of tileData.court) {
      tiles.push(tile);
    }
  const mappedcourtSize = saveDesignMapping(courtData);
  const saveDesign = {
    user_id: "user123",
    designName: courtData.designName,
    tileColor: tiles,
    courtSize: mappedcourtSize
  };

  useEffect(() => {
    const nameExist = checkName(courtData.designName, designNames);
    setNameExist(nameExist);
  }, [designNames, courtData.designName]);

  const [addDesign] = useAddDesignMutation();
  const [updateDesign] = useUpdateDesignMutation();
  const handleSaveDesign = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (nameExist) {
      updateDesign({ _id: courtData.courtId, design: saveDesign })
    }
    else {
      addDesign({ design: saveDesign })
      dispatch(addDesignNames(saveDesign.designName));
    }
    setDesignName(courtData.designName);
    setNameExist(true);
  }

  const [useDesignName, setDesignName] = React.useState(courtData.designName);
  const [useNameError, setNameError] = React.useState("");
  const handleCheckName = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    const editedName = String(event.target.value);
    setDesignName(event.target.value);
    const nameExist = checkName(editedName, designNames);
    setNameExist(nameExist);
    setNameError(nameExist ? (" is already existed.") : (""));
    if (!nameExist) {
      dispatch(changeDesignName(editedName));
    }
  }
  
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
          onClick={onOpen}
        >
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />
            <AlertDialogContent>
              <AlertDialogHeader>Save As</AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                Your design will be saved in FOLDER.
                <Text margin="5px 0" >Court Name: {useDesignName}{useNameError}</Text>
                <Input
                  value={useDesignName}
                  onChange={handleCheckName}
                  placeholder="Make your unique court name."
                />
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="red" ml={3} disabled={nameExist} onClick={handleSaveDesign} ref={cancelRef}>
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
