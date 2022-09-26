import { DESIGN_NAME_MAXCHARLENGTH } from "@/constants/index";
import { changeDesignName } from "@/store/reducer/courtSpecDataSlice";
import checkName, { setValidation } from "@/utils/checkName";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useNameCheckFeedback = (newDesignName: string, nameList: string[]) => {
  const [feedback, setFeedback] = useState("");
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const dispatch = useDispatch();
  const saveNameChange = () => {
    const validation = setValidation({
      maxCharLength: DESIGN_NAME_MAXCHARLENGTH,
      onlyWordChar: true,
    });
    const nameCheck = checkName(newDesignName, nameList, validation);
    switch (nameCheck) {
      case "blank":
        setFeedbackModalOpen(true);
        setFeedback("Please have a design name.");
        break;
      case "invalid":
        setFeedbackModalOpen(true);
        setFeedback(
          newDesignName +
            ` is not a valid name (less than ${DESIGN_NAME_MAXCHARLENGTH} characters and contains only letter, number and space).`
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
