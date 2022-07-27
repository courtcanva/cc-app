const checkName = (name: string, nameList: string[]) => {
  let nameCheck = "passCheck";
  if (nameList.includes(name)) { nameCheck = "existed"; }
  if (name === "" || name.replace(/(^\s*)|(\s*$)/g, "") === "") { nameCheck = "blank"; }
  // if () { nameCheck = "incorrect"; }
  return nameCheck;
}
export default checkName;
 