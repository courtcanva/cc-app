const checkName = (name: string, nameList: string[]) => {
  let nameCheck = "passCheck";
  const checkStartEndSpace = /(^\s*)|(\s*$)/g;
  if (nameList.includes(name) || nameList.includes(name.replace(checkStartEndSpace, ""))) { nameCheck = "existed"; }
  if (name === "" || name.replace(checkStartEndSpace, "") === "") { nameCheck = "blank"; }
  // if () { nameCheck = "incorrect"; }
  return nameCheck;
}
export default checkName;
 