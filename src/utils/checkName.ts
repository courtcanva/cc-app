const checkName = (name: string, nameList: string[]) => {
  let nameCheck = "passCheck";
  const checkStartEndSpace = /(^\s*)|(\s*$)/g;
  // requirement for design name is only contain letter and number and less than 15 char
  const validNamRegularExp = /^[A-Za-z0-9\s]{1,15}$/;
  if (nameList.includes(name) || nameList.includes(name.replace(checkStartEndSpace, ""))) {
    nameCheck = "existed";
  }
  if (name === "" || name.replace(checkStartEndSpace, "") === "") {
    nameCheck = "blank";
  }
  if (name.length > 0 && !validNamRegularExp.test(name)) {
    nameCheck = "invalid";
  }
  return nameCheck;
};
export default checkName;
