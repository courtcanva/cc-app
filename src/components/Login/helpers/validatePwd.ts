import React from "react";

const validatePwd = (
  password: string,
  confirmPassword: string,
  setWeakPasswordMsg: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
): boolean => {
  if (password !== confirmPassword) {
    setWeakPasswordMsg("");
    setErrorMessage("Password does not match!");
    return false;
  }
  // regular expression from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
  const passwordRegExp =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/; // eslint-disable-line
  if (!passwordRegExp.test(password)) {
    setErrorMessage("");
    setWeakPasswordMsg(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!"
    );
    return false;
  }
  return true;
};

export default validatePwd;
