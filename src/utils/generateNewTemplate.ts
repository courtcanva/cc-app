import { ISaveDesign } from "@/interfaces/design";
import { ITemplate } from "@/interfaces/template";
import { CourtSizeState } from "@/store/reducer/courtSpecDataSlice";
import { Court } from "@/store/reducer/tileSlice";
import { saveDesignMapping } from "./designMapping";

const generateNewTemplate = (
  userId: string,
  name: string,
  description: string | undefined,
  selectedCourtTileData: Court[],
  selectedCourt: CourtSizeState,
  imageUrl: string,
  designer?: string
): ITemplate => {
  const courtSizeData = saveDesignMapping(selectedCourt);
  const tiles = selectedCourtTileData;
  const selectedCourtCategory = selectedCourt.courtName.replace(/ /g, "");
  const courtType = "basketball";

  const newDesign: ISaveDesign = {
    designer: designer,
    user_id: "",
    designName: name,
    tileColor: tiles,
    courtSize: courtSizeData,
    image: "",
  };

  const newTemplate: ITemplate = {
    _id: "",
    user_id: userId,
    description,
    design: newDesign,
    image: imageUrl,
    tags: {
      CourtCategory: selectedCourtCategory,
      CourtType: courtType,
    },
  };
  return newTemplate;
};

export default generateNewTemplate;
