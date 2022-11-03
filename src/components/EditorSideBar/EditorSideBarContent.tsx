import { Box } from "@chakra-ui/react";
import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import Blueprints from "./Blueprints";
import Folder from "./Folder";
import { useGetCourtsQuery } from "@/redux/api/courtSizeApi";
import { ICourtData } from "@/interfaces/design";
import { IconContext } from "react-icons";
import Templates from "./Templates";
import { useGetTemplatesQuery } from "@/redux/api/templateApi";
import { ITemplateDataDb } from "@/interfaces/template";

interface Props {
  iconClickTitle: string;
  onHandleCloseClick: () => void;
}
const showContainerItem = (
  iconClickTitle: string,
  courtsData: ICourtData[],
  templateData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined
) => {
  switch (iconClickTitle) {
    case "Blueprints":
      return <Blueprints fetchedCourtsData={courtsData} />;
    case "Folder":
      return <Folder />;
    case "Templates":
      return <Templates templatesData={templateData} />;
    default:
      return iconClickTitle;
  }
};

const SideBarContainer = (props: Props) => {
  const { data: courtsData } = useGetCourtsQuery(0, {
    selectFromResult(result) {
      if (result.data) {
        result.data = result.data.filter((item: ICourtData) => !item.isHidden);
      }
      return result;
    },
  });

  const { data: rawTemplateData } = useGetTemplatesQuery("");

  return (
    <Box
      background="background.secondaryLight"
      padding="24px"
      height="calc(100vh - 72px)"
      top="72px"
      left="96px"
      position="fixed"
      zIndex="1510"
      color="fontcolor.primary"
    >
      {showContainerItem(props.iconClickTitle, courtsData, rawTemplateData)}
      <Box
        as="button"
        onClick={props.onHandleCloseClick}
        position="absolute"
        padding="0px"
        top="calc(48% - 84px)"
        right="-14px"
        height="100px"
        width="14px"
        background="background.secondaryLight"
        clipPath="polygon(0% 0%, 100% 8%, 100% 92%, 0% 100%)"
        zIndex="-1"
      >
        <IconContext.Provider value={{ style: { verticalAlign: "middle", marginLeft: "-8px" } }}>
          <RiArrowLeftSLine size={25} />
        </IconContext.Provider>
      </Box>
    </Box>
  );
};

export default SideBarContainer;
