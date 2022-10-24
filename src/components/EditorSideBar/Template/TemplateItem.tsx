import { ITemplateDataDb } from "@/interfaces/template";
import { Box, Fade, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import CourtTags from "./CourtTags";
import TemplateDetail from "./TemplateDetail";
import Image from "next/image";
import courtPic from "../courtImg.png";
import { startSelectTemplate } from "@/store/reducer/buttonToggleSlice";
import { useStoreSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";

interface Props {
  template: Omit<ITemplateDataDb, "__v" | "isDeleted">;
}

const TemplateItem = (prop: Props) => {
  const dispatch = useDispatch();
  const [detailBtnFade, setDetailBtnFade] = useState<boolean>(false);
  const { isTemplateSelect } = useStoreSelector((state) => state.buttonToggle);
  const [selectTemplate, setSelectTemplate] = useState(false);
  const { user_id: userId, tags } = prop.template;

  const handleMouseEnter = () => {
    setSelectTemplate(true);
    dispatch(startSelectTemplate(true));
  };

  return (
    <Box
      key={userId}
      position="relative"
      width="300px"
      height="200px"
      background="transparent"
      marginBottom="18px"
      display="flex"
      alignItems="center"
      justifyContent="left"
      cursor="pointer"
      fontSize="14"
      // opacity={!detailBtnFade || isTemplateSelect ? "1" : "0.4"}
      // onClick={() => handleCourtSelecting(courtId)}
    >
      <Box
        position="relative"
        width="full"
        height="full"
        padding="10px"
        backgroundColor="white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setDetailBtnFade(false)}
      >
        <Box width="90%" height="90%" position="absolute" zIndex={2010}>
          <CourtTags tags={tags} />
        </Box>
        {/* <Fade in={detailBtnFade}>
          <Flex
            position="absolute"
            backgroundColor="gray"
            right="1em"
            top="1em"
            width="2em"
            height="2em"
            justifyContent="center"
            alignItems="center"
            borderRadius="20%"
            zIndex={2010}
          >
            <AiOutlineEllipsis fontSize="1.5em" />
          </Flex>
        </Fade> */}
        {detailBtnFade && (
          <TemplateDetail
            isOpen={detailBtnFade}
            onClose={() => setDetailBtnFade(false)}
            template={prop.template}
          />
        )}
        <Box width="full" height="full" position="relative">
          <Image src={courtPic} layout="fill" objectFit="contain" />
        </Box>
      </Box>
    </Box>
  );
};
export default TemplateItem;
