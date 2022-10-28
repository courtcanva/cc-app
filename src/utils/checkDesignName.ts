import { DESIGN_NAME_REGULAR_EXPRESSION } from "@/constants/courtData";
import { DESIGN_NAME_MAX_CHAR_LENGTH } from "@/constants/courtData";

const checkDesignName = (name: string, nameList: string[]) => {
  name.trim();

  if (name.length > DESIGN_NAME_MAX_CHAR_LENGTH) {
    return `The design name should less than ${DESIGN_NAME_MAX_CHAR_LENGTH} characters.`;
  }

  // when canBeBlank is false, check if name is blank
  if (name.length === 0) {
    return "Please enter a design name.";
  }
  // check if name exists in nameList
  if (nameList.includes(name)) {
    return `${name} has already existed.`;
  }
  // validate the name with regular expression
  if (!DESIGN_NAME_REGULAR_EXPRESSION.test(name)) {
    return "Design name should only contain letter, number and space.";
  }
  return "";
};
export default checkDesignName;
