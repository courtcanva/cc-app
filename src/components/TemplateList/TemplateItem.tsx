import { ITemplateDataDb } from "@/interfaces/template";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CourtTags from "./CourtTags";
import TemplateDetail from "./TemplateDetail";
import Image from "next/image";
import { startSelectTemplate } from "@/store/reducer/buttonToggleSlice";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import moment from "moment";

interface Props {
  template: Omit<ITemplateDataDb, "__v" | "isDeleted">;
}

const TemplateItem = (prop: Props) => {
  const dispatch = useDispatch();
  const { isTemplateSelect } = useStoreSelector((state) => state.buttonToggle);
  const [hoverOn, setHoverOn] = useState<boolean>(false);
  const [enableTempDetail, setEnableTempDetail] = useState<boolean>(false);
  const highLightItem = isTemplateSelect && !hoverOn ? false : true;

  const templateItem = {
    userId: prop.template.user_id,
    description: prop.template.description,
    courtImgUrl: prop.template.image,
    createDate: moment(prop.template.createdAt).format("DD/MM/YYYY"),
    tags: prop.template.tags,
    designDetail: prop.template.design,
  };

  const handleTemplateSelect = () => {
    setHoverOn(true);
    dispatch(startSelectTemplate(true));
  };

  const resetHeightLight = () => {
    setHoverOn(false);
    dispatch(startSelectTemplate(false));
  };

  const templateDetailOn = () => {
    setEnableTempDetail(true);
  };

  const detailOnClose = () => {
    setEnableTempDetail(false);
    resetHeightLight();
  };

  return (
    <Flex
      position="relative"
      width="300px"
      height="240px"
      marginBottom="16px"
      flexDirection="column"
      alignItems="center"
      padding="5px 10px 10px 10px"
      backgroundColor="white"
      cursor="pointer"
      opacity={highLightItem ? "1" : "0.4"}
      onMouseEnter={handleTemplateSelect}
      onClick={handleTemplateSelect}
      onMouseLeave={resetHeightLight}
    >
      <Box width="95%">
        <Box>
          <Text color="black" fontSize="1rem" fontWeight="700">
            {templateItem.designDetail.designName}
          </Text>
          <Text
            color="fontcolor.tealishBlue"
            fontSize="0.8rem"
          >{`Created at ${templateItem.createDate}`}</Text>
        </Box>
        {hoverOn && (
          <Box top="10px" position="absolute" right="1rem">
            <Button
              backgroundColor="gray.400"
              size="sm"
              opacity="0.95"
              _hover={{
                backgroundColor: "gray.500",
              }}
              onClick={templateDetailOn}
            >
              <FaEllipsisH color="white" fontSize="1.1rem" />
            </Button>
          </Box>
        )}
      </Box>

      <Box width="80%" height="full" position="relative">
        <Image src={templateItem.courtImgUrl} layout="fill" objectFit="contain" />
      </Box>

      <Flex width="full" wrap="wrap" gap="1rem" justifyContent="space-around">
        <CourtTags tags={templateItem.tags} />
      </Flex>

      <TemplateDetail isOpen={enableTempDetail} onClose={detailOnClose} template={templateItem} />
    </Flex>
  );
};
export default TemplateItem;
