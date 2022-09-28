interface IValidationOptions {
  // if the name can be blank
  canBeBlank?: boolean;
  // maximum characters for the name
  maxCharLength: number;
  // minimum characters for the name
  minCharLength?: number;
  // if name contains only word characters (letter, number, space)
  onlyWordChar?: boolean;
}

export const setValidation = (options: IValidationOptions) => {
  const { canBeBlank = false, maxCharLength, minCharLength = 1, onlyWordChar = false } = options;
  const checkStartEndSpace = /(^\s*)|(\s*$)/g;
  const onlyWordCharRegularExp = /^[a-zA-Z0-9\s]+$/g;
  const validation = (name: string, nameList: string[]) => {
    let result = "passCheck";
    // check if name exists in nameList
    if (nameList.includes(name) || nameList.includes(name.replace(checkStartEndSpace, ""))) {
      result = "existed";
    }
    // when canBeBlank is false, check if name is blank
    if (!canBeBlank && (name.length === 0 || name.replace(checkStartEndSpace, "") === "")) {
      result = "blank";
    }
    // check if name longer than minCharLength and shorter than maxCharLength
    if (name.length > 0 && (name.length < minCharLength || name.length > maxCharLength)) {
      result = "invalid";
    }
    // when onlyWordChar is true, check if name contains only word characters
    if (onlyWordChar && name.length > 0 && !onlyWordCharRegularExp.test(name)) {
      result = "invalid";
    }
    return result;
  };
  return validation;
};

const checkName = (
  name: string,
  nameList: string[],
  validation: (name: string, nameList: string[]) => string
) => {
  const nameCheck = validation(name, nameList);
  return nameCheck;
};
export default checkName;
