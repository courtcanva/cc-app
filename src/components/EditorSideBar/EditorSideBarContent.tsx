import { Box } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import Blueprints from "./Blueprints";
import Folder from "./Folder";
import { useGetCourtsQuery } from "@/redux/api/courtSizeApi";
import { ICourtData } from "@/interfaces/design";
import { IconContext } from "react-icons";
import Templates from "./Templates";
import { useGetTemplateListsQuery, useGetTemplatesQuery } from "@/redux/api/templateApi";
import { ITemplateDataDb, ITemplateLists, ITemplateObj } from "@/interfaces/template";
import { LIMIT } from "@/constants/templateItemPagination";

interface IPackTemplates {
  offset: number;
  templatesData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
  setTemplatesData: React.Dispatch<
    React.SetStateAction<Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined>
  >;
  isLoading: boolean;
  hasNextPage: boolean;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
  newData: Omit<ITemplateDataDb, "__v" | "isDeleted">[] | undefined;
  isSuccess: boolean;
  filterTag: string;
}

interface Props {
  iconClickTitle: string;
  onHandleCloseClick: () => void;
}

const showContainerItem = (
  iconClickTitle: string,
  courtsData: ICourtData[],
  packTemplates: IPackTemplates
) => {
  switch (iconClickTitle) {
    case "Blueprints":
      return <Blueprints fetchedCourtsData={courtsData} />;
    case "Folder":
      return <Folder />;
    case "Templates":
      return <Templates {...packTemplates} />;
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

  const [offset, setOffset] = useState<number>(0);
  const limit = LIMIT;
  const [pageNum, setPageNum] = useState<number>(1);
  const [templatesData, setTemplatesData] = useState<any>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [filterTag, setFilterTag] = useState<string>("");

  const {
    data: rawTemplateData,
    isLoading,
    isSuccess,
  } = useGetTemplateListsQuery({ offset, limit, filterTag });

  const newData: any = rawTemplateData?.data;
  // if (isSuccess) console.log(newData);
  if (isSuccess) console.log(filterTag);

  useEffect(() => {
    // if (filterTag) {
    //   setTemplatesData(newData);
    // }
    if (isSuccess) {
      setTemplatesData((prev: any) => [...prev, ...newData]);
      setHasNextPage(Boolean(newData.length));
    }

    // if (isSuccess && filterTag) {
    //   setTemplatesData(newData);
    //   setTimeout(() => {
    //     setTemplatesData((prev: any) => [...prev, ...newData]);
    //   }, 1000);
    //   setHasNextPage(Boolean(newData.length));
    // }
  }, [isSuccess]);

  const packTemplates: IPackTemplates = {
    offset,
    templatesData,
    isLoading,
    hasNextPage,
    setOffset,
    setPageNum,
    setFilterTag,
    setTemplatesData,
    newData,
    isSuccess,
    filterTag,
  };

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
      {showContainerItem(props.iconClickTitle, courtsData, packTemplates)}
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
