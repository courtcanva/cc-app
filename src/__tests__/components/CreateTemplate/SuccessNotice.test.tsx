import { screen, waitFor } from "@testing-library/react";
import SuccessNotice from "@/components/CreateTemplate/SuccessNotice";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SuccessNotice", () => {
  test("should render successNotice page when user punish template successfully", () => {
    const { getByText } = renderWithMockedProvider(
      <SuccessNotice isOpen={true} onClose={() => void {}} />
    );
    const closeBtn = screen.getByRole("closeBtn");
    expect(
      getByText("Congratulations You have successfully submitted a new template!")
    ).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });

  test("should not render successNotice when user click the close button", async () => {
    // const setCloseState = jest.fn();
    // const useStateSpy = jest.spyOn(React, "useState");
    // useStateSpy.mockImplementation((initialState:boolean) => [initialState, setState]);
    // const closeState: any = (useState: boolean) => [closeState, setCloseState];
    // jest.spyOn(React, "useState").mockImplementation(closeState);
    const { getByText } = renderWithMockedProvider(
      <SuccessNotice isOpen onClose={() => void {}} />
    );
    const closeBtn = screen.getByRole("closeBtn");
    userEvent.click(closeBtn);
    await waitFor(() => expect(closeBtn).not.toBeVisible());
    await waitFor(() =>
      expect(
        getByText("Congratulations You have successfully submitted a new template!")
      ).not.toBeVisible()
    );
  });
});
