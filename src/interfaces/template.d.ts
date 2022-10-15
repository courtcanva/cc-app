import { IDesign } from "@/interfaces/design";

export interface ITags {
  courtType: string;
  courtCategory: string;
}

export interface ITemplate {
  _id: string;
  user_id: string;
  description: string | undefined | null;
  design: IDesign;
  image: string;
  tags: ITags;
}

export interface ITemplateDataDb extends ITemplate {
  createdAt: string;
  updatedAt: string;
  status: string;
  isOfficial: boolean;
  isDeleted: boolean;
  __v: number;
}
