import React from "react";

const validateUsername = (
  firstName: string,
  lastName: string,
  setInvalidUsernameMsg: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  const usernameRegExp = /[*|":<>[\]{}`\\()';!?@#$%^&~/_+=\s]/; // eslint-disable-line
  if (usernameRegExp.test(firstName) || usernameRegExp.test(lastName)) {
    setInvalidUsernameMsg(
      "Please do not include any special characters in your first name or last name."
    );
    return false;
  }
  return true;
};

export default validateUsername;
