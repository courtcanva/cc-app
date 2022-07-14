import React from "react";
import { Button, ButtonGroup, Flex, IconButton } from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import DocSvg from "@/assets/svg/TopBarSvg/document.svg";
import SaveSvg from "@/assets/svg/TopBarSvg/save.svg";

const SaveBoard: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Flex data-testid="SaveBoard">
      <ButtonGroup flexDirection={"column"}>
        <Button
          leftIcon={<SaveSvg />}
          aria-label="SaveSvg"
          bg={"white"}
          w="155px"
          h="45px"
          margin="0px"
          alignItems="center"
        >
          Save
        </Button>
        <Button
          leftIcon={<DocSvg />}
          aria-label="DocSvg"
          bg={"white"}
          w="155px"
          h="45px"
          margin="0px"
          alignItems="center"
        >
          Save as
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default SaveBoard;
