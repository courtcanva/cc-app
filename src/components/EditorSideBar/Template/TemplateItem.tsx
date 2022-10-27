import { ITemplateDataDb } from "@/interfaces/template";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import CourtTags from "./CourtTags";
import TemplateDetail from "./TemplateDetail";
import Image from "next/image";
import courtPic from "../courtImg.png";
import { startSelectTemplate } from "@/store/reducer/buttonToggleSlice";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";

interface Props {
  template: Omit<ITemplateDataDb, "__v" | "isDeleted">;
}

const TemplateItem = (prop: Props) => {
  const dispatch = useDispatch();
  const { isTemplateSelect } = useStoreSelector((state) => state.buttonToggle);
  const [hoverOn, setHoverOn] = useState<boolean>(false);
  const [enableTempDetail, setEnableTempDetail] = useState<boolean>(false);
  const highLight = isTemplateSelect && !hoverOn ? false : true;
  const createDate = new Date(prop.template.createdAt.split("T")[0]);

  const templateItem = {
    userId: prop.template.user_id,
    description: prop.template.description,
    courtImgUrl: prop.template.image,
    createDate: createDate.toLocaleDateString(),
    tags: prop.template.tags,
    designDetail: prop.template.design,
    // publisherName: prop.template.
  };

  const handleMouseEnter = () => {
    setHoverOn(true);
    dispatch(startSelectTemplate(true));
  };

  const resetHeightLight = () => {
    setHoverOn(false);
    dispatch(startSelectTemplate(false));
  };

  const handleTemplateSelect = () => {
    setEnableTempDetail(true);
  };

  const detailOnClose = () => {
    setEnableTempDetail(false);
    dispatch(startSelectTemplate(true));
  };

  return (
    <Flex
      key={templateItem.userId}
      position="relative"
      width="300px"
      height="240px"
      marginBottom="16px"
      flexDirection="column"
      alignItems="center"
      padding="5px 10px 10px 10px"
      backgroundColor="white"
      cursor="pointer"
      opacity={highLight ? "1" : "0.4"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={resetHeightLight}
    >
      <Box width="95%" marginBottom="0.2em">
        <Box>
          <Text color="black" fontSize="1em" fontWeight="700" line-height="15px">
            {templateItem.designDetail.designName}
          </Text>
          <Text color="#2C4E8A" fontSize="0.8em">{`Created at ${templateItem.createDate}`}</Text>
        </Box>
        {hoverOn && (
          <Box top="10px" position="absolute" zIndex="1" right="1em">
            <Button
              backgroundColor="gray.400"
              size="sm"
              opacity="0.95"
              _hover={{
                backgroundColor: "gray.500",
              }}
              onClick={handleTemplateSelect}
            >
              <FaEllipsisH color="white" fontSize="1.1em" />
            </Button>
          </Box>
        )}
      </Box>

      <Box width="80%" height="full" position="relative">
        <Image src={courtPic} layout="fill" objectFit="contain" />
      </Box>

      <Flex width="full" wrap="wrap" gap="1em" justifyContent="space-around">
        <CourtTags tags={templateItem.tags} />
      </Flex>

      {enableTempDetail && (
        <TemplateDetail isOpen={enableTempDetail} onClose={detailOnClose} template={templateItem} />
      )}
    </Flex>
  );
};
export default TemplateItem;
