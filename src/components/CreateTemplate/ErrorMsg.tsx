import { ITemplateErrorInput, ITemplateErrorMsg } from "@/interfaces/template";
import { Text } from "@chakra-ui/react";

interface Props {
  userInputError: ITemplateErrorInput;
  inputErrorMsg: ITemplateErrorMsg;
}

const ErrorMsg = (prop: Props) => {
  return (
    <Text
      color="crimson"
      visibility={
        prop.userInputError.courtNameFullErr || prop.userInputError.courtNameNullErr
          ? "visible"
          : "hidden"
      }
      fontSize="0.8rem"
    >
      {prop.userInputError.courtNameFullErr
        ? prop.inputErrorMsg.nameFullErrMsg
        : prop.inputErrorMsg.nameNullErrMsg}
    </Text>
  );
};
export default ErrorMsg;
