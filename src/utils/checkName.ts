import { CHECK_START_END_SPACE } from "@/constants/courtData";

const checkName = (name: string, nameList: string[]) => {
  let nameCheck = "passCheck";
  if (nameList.includes(name) || nameList.includes(name.replace(CHECK_START_END_SPACE, ""))) { nameCheck = "existed"; }
  if (name === "" || name.replace(CHECK_START_END_SPACE, "") === "") { nameCheck = "blank"; }
  // if () { nameCheck = "incorrect"; }
  return nameCheck;
}
export default checkName;
 