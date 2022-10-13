import { IDesign } from "@/interfaces/design";

export type CourtType = "basketball" | "tennis";
export type CourtCategory = "proFullCourt" | "fullCourt" | "halfCourt" | "smallCourt";

export interface ITags {
  courtType: courtType;
  courtCategory: CourtCategory;
}

export interface ITemplate {
  // id有点疑问
  // _id: string;
  user_id: string;
  description: string;
  design: IDesign;
  image: string;
  tags: ITags;
}