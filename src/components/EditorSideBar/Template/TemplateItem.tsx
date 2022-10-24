import { ITemplateDataDb } from "@/interfaces/template";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
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
  const [hoverOn, setHoverOn] = useState<boolean>(false);
  const { isTemplateSelect } = useStoreSelector((state) => state.buttonToggle);
  const [enableTempDetail, setEnableTempDetail] = useState<boolean>(false);
  const highLight = isTemplateSelect && !hoverOn ? false : true;
  const { user_id: userId, tags } = prop.template;

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
    setHoverOn(false);
    dispatch(startSelectTemplate(false));
  };

  return (
    <Box
      key={userId}
      position="relative"
      width="300px"
      height="200px"
      background="transparent"
      display="flex"
      marginBottom="16px"
      alignItems="center"
      justifyContent="left"
      cursor="pointer"
      fontSize="14"
      opacity={highLight ? "1" : "0.4"}
      animation="ease-in-out"
      onClick={handleTemplateSelect}
    >
      <Box
        position="relative"
        width="full"
        height="full"
        padding="10px"
        backgroundColor="white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={resetHeightLight}
      >
        <Box width="90%" height="90%" position="absolute" zIndex={2010}>
          <CourtTags tags={tags} />
        </Box>

        {enableTempDetail && (
          <TemplateDetail
            isOpen={enableTempDetail}
            onClose={detailOnClose}
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
