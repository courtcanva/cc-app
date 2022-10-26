import { IDesign } from "@/interfaces/design";

export interface ITags {
  CourtType: string;
  CourtCategory: string;
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

export interface IMyTemplates {
  _id: string;
  courtName: string;
  user_id: string;
  description: string | undefined | null;
  image: string;
  createdAt: string;
  status: string;
  tags: ITags;
}

export interface testImyTemplates {
  _id: string;
  courtName: string;
  user_id: string;
  description: string;
  image: string;
  createdAt: string;
  status: string;
  tags: ITags;
}
