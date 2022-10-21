import { ITemplateErrorInput, ITemplateErrorMsg } from "@/interfaces/template";

export const MAX_COURTNAME_LEN = 15;
export const MAX_DESCRIPTION_LEN = 200;
export const MAX_USERNAME_DISPLAY = 20;
export const REGEX = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

export const INPUT_ERR_INIT: ITemplateErrorInput = {
  courtNameFullErr: false,
  courtNameNullErr: false,
  descriptionOverLimit: false,
};

export const INPUT_ERROR_MSG: ITemplateErrorMsg = {
  nameFullErrMsg: `Court name cannot have more than ${MAX_COURTNAME_LEN} characters`,
  nameNullErrMsg: "Court name cannot be empty",
  descriptionLenErrMsg: `Description can not over ${MAX_DESCRIPTION_LEN} words`,
};
