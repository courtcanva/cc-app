import { screen, waitFor } from "@testing-library/react";
import SuccessNotice from "@/components/CreateTemplate/SuccessNotice";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SuccessNotice", () => {
  it("should render successNotice page when user punish template successfully", () => {
    renderWithMockedProvider(<SuccessNotice isOpen={true} onClose={() => void {}} />);
    const closeBtn = screen.getByRole("closeBtn");
    expect(
      screen.getByText("Congratulations You have successfully submitted a new template!")
    ).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });

  it("should not render successNotice when user click the close button", async () => {
    renderWithMockedProvider(<SuccessNotice isOpen onClose={() => void {}} />);
    const closeBtn = screen.getByRole("closeBtn");
    userEvent.click(closeBtn);
    await waitFor(() => expect(closeBtn).not.toBeVisible());
    await waitFor(() =>
      expect(
        screen.getByText("Congratulations You have successfully submitted a new template!")
      ).not.toBeVisible()
    );
  });
});
