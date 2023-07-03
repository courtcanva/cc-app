import DesignTools from "./DesignTools";
import DisplayAdjustment from "./DisplayAdjustment";
import FileManagement from "./FileMangement";
import Quotation from "./Quotation";

const rightSideBarItemList = [
  {
    id: 1,
    section: <FileManagement />,
  },
  {
    id: 2,
    section: <DesignTools />,
  },
  {
    id: 3,
    section: <DisplayAdjustment />,
  },
  {
    id: 4,
    section: <Quotation />,
  },
];
export default rightSideBarItemList;
