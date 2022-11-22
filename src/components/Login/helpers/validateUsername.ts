import React from "react";

const validateUsername = (
  firstName: string,
  lastName: string,
  setInvalidUsernameMsg: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  // regular expression from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
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
