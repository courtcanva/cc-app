import { ISaveDesign } from "@/interfaces/design";

export interface ITags {
  CourtType: string;
  CourtCategory: string;
}

export interface ITemplate {
  _id: string;
  user_id: string;
  description: string | undefined | null;
  design: ISaveDesign;
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

export interface ITemplateErrorInput {
  courtNameFullErr: boolean;
  courtNameNullErr: boolean;
  descriptionOverLimit: boolean;
}

export interface ITemplateErrorMsg {
  nameFullErrMsg: string;
  nameNullErrMsg: string;
  descriptionLenErrMsg: string;
}

export type IMyTemplates = Omit<
  ITemplateDataDb,
  "__v" | "isOfficial" | "updatedAt" | "design" | "isDeleted"
>;

export interface ITestImyTemplates extends Omit<IMyTemplates, "description"> {
  description: string;
  courtName: string;
}
