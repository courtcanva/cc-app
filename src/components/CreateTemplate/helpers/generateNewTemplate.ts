import { IDesign } from "@/interfaces/design";
import { ITemplate } from "@/interfaces/template";
import { useStoreSelector } from "@/store/hooks";
import { CourtSizeState } from "@/store/reducer/courtSpecDataSlice";
import { Court } from "@/store/reducer/tileSlice";
import { saveDesignMapping } from "../../../utils/designMapping";

export const generateNewTemplate = (
  userId: string,
  name: string,
  description: string | undefined,
  selectedCourtTileData: Court[],
  selectedCourt: CourtSizeState
): ITemplate => {
  const courtSizeData = saveDesignMapping(selectedCourt);
  const tiles = selectedCourtTileData;
  const selectedCourtCategory = selectedCourt.courtName.replace(/ /g, "");
  const courtType = "basketball";

  const newDesign: IDesign = {
    _id: "",
    user_id: "",
    designName: name,
    tileColor: tiles,
    courtSize: courtSizeData,
  };

  const newTemplate: ITemplate = {
    _id: "",
    user_id: userId,
    description,
    design: newDesign,
    image: "image_url",
    tags: {
      CourtCategory: selectedCourtCategory,
      CourtType: courtType,
    },
  };
  return newTemplate;
};
