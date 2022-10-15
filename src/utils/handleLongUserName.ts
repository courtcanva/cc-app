export const userNameEllip = (FullName: string, lengthLimit: number) => {
  if (FullName.length > lengthLimit) {
    return `${FullName.slice(0, lengthLimit).trim()}...`;
  } else {
    return FullName;
  }
};
