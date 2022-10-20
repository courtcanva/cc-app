import { ITemplateErrorInput, ITemplateErrorMsg } from "@/interfaces/template";
import { Text } from "@chakra-ui/react";

interface Props {
  userInputError: ITemplateErrorInput;
  inputErrorMsg: ITemplateErrorMsg;
}

const ErrorMsg = (props: Props) => {
  const { userInputError, inputErrorMsg } = props;
  return (
    <Text
      color="crimson"
      visibility={
        userInputError.courtNameFullErr || userInputError.courtNameNullErr ? "visible" : "hidden"
      }
      fontSize="0.8rem"
    >
      {userInputError.courtNameFullErr
        ? inputErrorMsg.nameFullErrMsg
        : inputErrorMsg.nameNullErrMsg}
    </Text>
  );
};
export default ErrorMsg;
