import { Box, Flex, IconButton, FormControl, Switch, FormLabel, Checkbox } from "@chakra-ui/react";
import { HiOutlineZoomOut, HiOutlineZoomIn } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { ContainerFooter } from "../PriceBar/styles";

const EditorFooter = () => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px={4}
      w="100%"
      bg="white"
      lineHeight="34px"
    >
      <Box ml="96px">
        <IconButton
          aria-label="Revert edit"
          icon={<HiOutlineZoomOut />}
          variant="navbarIconBtn"
          color="brand.primary"
        />
        <IconButton
          aria-label="Forward edit"
          icon={<HiOutlineZoomIn />}
          variant="navbarIconBtn"
          color="brand.primary"
        />
      </Box>
      <Flex gap={8}>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="ruler-swith-btn" mb="0">
            Ruler On
          </FormLabel>
          <Switch id="email-alerts" colorScheme="footerSwitch" sx={{"span:first-child":{
            bgColor:"brand.primary",
          }}}/>
        </FormControl>
        <IconButton
          aria-label="Forward edit"
          icon={<BiHelpCircle />}
          variant="navbarIconBtn"
          color="brand.primary"
        />
      </Flex>
    </Flex>
  );
};

export default EditorFooter;
