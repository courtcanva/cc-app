import React from "react";
import { Box, Flex, IconButton, FormControl, Switch, FormLabel } from "@chakra-ui/react";
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";

const EditorFooter = () => {
  const [rulerLabel, setRulerLabel] = React.useState("Ruler on");
  return (
    <Flex
      position="fixed"
      bottom="0"
      justifyContent="space-between"
      alignItems="center"
      px={4}
      w="100%"
      bg="white"
      boxShadow="xs"
      lineHeight="34px"
      zIndex={-1}
    >
      <Box ml="96px">
        <IconButton
          aria-label="Revert edit"
          icon={<HiOutlineZoomOut />}
          variant="editorFooterIconBtn"
          color="brand.primary"
          data-testid="zoom-out-btn"
        />
        <IconButton
          aria-label="Forward edit"
          icon={<HiOutlineZoomIn />}
          variant="editorFooterIconBtn"
          color="brand.primary"
          data-testid="zoom-in-btn"
        />
      </Box>
      <Flex gap={8}>
        <FormControl display="flex" alignItems="center">
          <FormLabel
            htmlFor="ruler-swith-btn"
            mb="0"
            color="brand.primary"
            data-testid="ruler-label"
          >
            {rulerLabel}
          </FormLabel>
          <Switch
            id="email-alerts"
            colorScheme="footerSwitch"
            sx={{
              "span:first-child": {
                bgColor: "brand.primary",
              },
            }}
            defaultChecked
            onChange={(e) => setRulerLabel(e.target.checked ? "Ruler on" : "Ruler off")}
            data-testid="switch-btn"
          />
        </FormControl>
        <IconButton
          aria-label="Forward edit"
          icon={<BiHelpCircle />}
          variant="editorFooterIconBtn"
          color="brand.primary"
          data-testid="help-btn"
        />
      </Flex>
    </Flex>
  );
};

export default EditorFooter;
