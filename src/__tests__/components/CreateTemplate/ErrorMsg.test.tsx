import ErrorMsg from "@/components/CreateTemplate/ErrorMsg";
import { render, screen } from "@testing-library/react";
import { INPUT_ERROR_MSG } from "@/constants/templateCreate";
import { ITemplateErrorInput } from "@/interfaces/template";
import { forEach } from "lodash";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

describe("ErrorMsg", () => {

  let userInputError: ITemplateErrorInput;

  forEach(() => {
    userInputError = {
      courtNameFullErr: false,
      courtNameNullErr: false,
      descriptionOverLimit: false,
    }
  });

  it("should not display error message when no validations occur", () => {
    const userInput = { ...userInputError };
    const inputErrorMsg = INPUT_ERROR_MSG;
    render(<ErrorMsg userInputError={userInput} inputErrorMsg={inputErrorMsg} />);
    const errorMsg1 = screen.queryByText(INPUT_ERROR_MSG.nameFullErrMsg);
    const errorMsg2 = screen.getByText(INPUT_ERROR_MSG.nameNullErrMsg);
    expect(errorMsg1).not.toBeInTheDocument();
    expect(errorMsg2).not.toBeVisible();
  });

  it("should display correct error message when court name is null", () => {
    const userInput = {
      ...userInputError,
      courtNameNullErr: true,
    };
    const inputErrorMsg = INPUT_ERROR_MSG;
    render(<ErrorMsg userInputError={userInput} inputErrorMsg={inputErrorMsg} />);
    const errorMsg1 = screen.getByText(INPUT_ERROR_MSG.nameNullErrMsg);
    const errorMsg2 = screen.queryByText(INPUT_ERROR_MSG.nameFullErrMsg);
    expect(errorMsg1).toBeVisible();
    expect(errorMsg2).not.toBeInTheDocument();
  });

  it("should display correct error message when court name is full", () => {
    const userInput = {
      ...userInputError,
      courtNameFullErr: true,
    };
    const inputErrorMsg = INPUT_ERROR_MSG;
    render(<ErrorMsg userInputError={userInput} inputErrorMsg={inputErrorMsg} />);
    const errorMsg1 = screen.queryByText(INPUT_ERROR_MSG.nameNullErrMsg);
    const errorMsg2 = screen.getByText(INPUT_ERROR_MSG.nameFullErrMsg);
    expect(errorMsg1).not.toBeInTheDocument();
    expect(errorMsg2).toBeVisible();
  });
});
