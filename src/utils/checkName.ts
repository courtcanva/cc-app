const checkName = (name: string, nameList: string[]) => {
  const exist = nameList.includes(name) ? (true) : (false);
  return exist;
}
export default checkName;
