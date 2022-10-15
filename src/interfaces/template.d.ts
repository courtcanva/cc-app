import { IDesign } from "@/interfaces/design";

export type CourtType = "basketball" | "tennis";
export type CourtCategory = "proFullCourt" | "fullCourt" | "halfCourt" | "smallCourt";

export interface ITags {
  courtType: courtType;
  courtCategory: CourtCategory;
}

export interface ITemplate {
  _id: string;
  user_id: string;
  description: string;
  design: IDesign;
  image: string;
  tags: ITags;
}

export interface ITemplateDataDb extends ITemplate {
  createdAt: string;
  updatedAt: string;
  status: string;
  isOfficial: boolean;
  image: string;
  description: string;
  isDeleted: boolean;
  __v: number;
}
