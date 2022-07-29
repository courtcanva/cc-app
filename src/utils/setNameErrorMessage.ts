const errorMessage = (nameCheck: string) => {
  let message = "";
  switch (nameCheck) {
    case "existed":
      message = " is already existed.";
      break;
    case "blank":
      message = "Please enter a name.";
      break;
    case "incorrect":
      message = " is a incorrect name type.";
      break;
    case "passCheck":
      message = "";
      break;
    default:
      message = " is already existed.";
  }
  return message;
};

export default errorMessage;
