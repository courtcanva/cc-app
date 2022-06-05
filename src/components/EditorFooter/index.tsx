import { Box, Flex, IconButton, FormControl, Switch, FormLabel } from "@chakra-ui/react";
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { useState } from "react";

const EditorFooter = () => {
  const [ruler, setRuler] = useState("Ruler On");
  return (
    <Flex
      position="fixed"
      bottom="0"
      justifyContent="space-between"
      alignItems="center"
      px={4}
      w="calc(100vw - 98px)"
      bg="white"
      boxShadow="dark-lg"
      lineHeight="34px"
      left="98px"
      zIndex={1500}
    >
      <Box>
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
            htmlFor="ruler-switch-btn"
            mb="0"
            color="brand.primary"
            data-testid="ruler-label"
            w="70px"
          >
            {ruler}
          </FormLabel>
          <Switch
            id="ruler-switch-btn"
            colorScheme="footerSwitch"
            className="custom-switch"
            sx={{
              "span:first-child": {
                bgColor: "brand.primary",
              },
            }}
            defaultChecked
            data-testid="switch-btn"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRuler(e.target.checked ? "Ruler On" : "Ruler Off")
            }
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
