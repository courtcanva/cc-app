import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useNameCheckFeedback } from "@/hooks/useNameCheckFeedback";

const mockDispatch = jest.fn();
const mockSelector = jest.fn().mockImplementation(() => ({
  status: "",
  result: "",
}));
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
  useSelector: () => mockSelector(),
}));

const existedName = "small court";
const blankName = "";
const invalidName = "small court - 123456789";
const validNewName = "small court 1";
const mockNameList = ["small court", "medium court"];

describe("useNameCheckFeedback hook", () => {
  it("should give existed feedback", () => {
    const { result } = renderHook(() => useNameCheckFeedback(existedName, mockNameList));
    act(() => {
      result.current.saveNameChange();
    });
    expect(result.current.feedbackModalOpen).toEqual(true);
    expect(result.current.feedback).toEqual("Design name " + existedName + " is already existed.");
  });
  it("should give blank feedback", () => {
    const { result } = renderHook(() => useNameCheckFeedback(blankName, mockNameList));
    act(() => {
      result.current.saveNameChange();
    });
    expect(result.current.feedbackModalOpen).toEqual(true);
    expect(result.current.feedback).toEqual("Please have a design name.");
  });
  it("should give invalid feedback", () => {
    const { result } = renderHook(() => useNameCheckFeedback(invalidName, mockNameList));
    act(() => {
      result.current.saveNameChange();
    });
    expect(result.current.feedbackModalOpen).toEqual(true);
    expect(result.current.feedback).toEqual(
      invalidName +
        " is not a valid name (less than 15 characters and contains only letter, number and space)."
    );
  });
  it("should pass name check with valid name", () => {
    const { result } = renderHook(() => useNameCheckFeedback(validNewName, mockNameList));
    act(() => {
      result.current.saveNameChange();
    });
    expect(result.current.feedbackModalOpen).toEqual(false);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: "small court 1",
      type: "courtSpecData/changeDesignName",
    });
  });
});
