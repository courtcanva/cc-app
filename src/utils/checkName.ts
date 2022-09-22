import { useStoreSelector } from "@/store/hooks";
import { changeDesignName } from "@/store/reducer/courtSpecDataSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const checkName = (name: string, nameList: string[]) => {
  let nameCheck = "passCheck";
  const checkStartEndSpace = /(^\s*)|(\s*$)/g;
  // requirement for design name is only contain letter and number and less than 15 char
  const validNamRegularExp = /^[A-Za-z0-9\s]{1,15}$/;
  if (nameList.includes(name) || nameList.includes(name.replace(checkStartEndSpace, ""))) {
    nameCheck = "existed";
  }
  if (name === "" || name.replace(checkStartEndSpace, "") === "") {
    nameCheck = "blank";
  }
  if (name.length > 0 && !validNamRegularExp.test(name)) {
    nameCheck = "invalid";
  }
  return nameCheck;
};
export default checkName;

export const useNameCheckFeedback = (newDesignName: string) => {
  const nameList = useStoreSelector((state) => state.designName.nameList);
  const [feedback, setFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const dispatch = useDispatch();
  const saveNameChange = () => {
    const nameCheck = checkName(newDesignName, nameList);
    switch (nameCheck) {
      case "blank":
        setFeedbackModalOpen(true);
        setFeedback("Please have a design name.");
        break;
      case "invalid":
        setFeedbackModalOpen(true);
        setFeedback(
          newDesignName +
            " is not a valid name (less than 15 characters and contains only word characters)."
        );
        break;
      case "existed":
        setFeedbackModalOpen(true);
        setFeedback(`Design name ` + newDesignName + ` is already existed.`);
        break;
      case "passCheck":
        dispatch(changeDesignName(newDesignName));
        break;
    }
  };
  return { feedbackModalOpen, setFeedbackModalOpen, feedback, saveNameChange };
};
