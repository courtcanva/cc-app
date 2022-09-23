import { useStoreSelector } from "@/store/hooks";
import { changeDesignName } from "@/store/reducer/courtSpecDataSlice";
import checkName from "@/utils/checkName";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useNameCheckFeedback = (newDesignName: string, nameList: string[]) => {
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
