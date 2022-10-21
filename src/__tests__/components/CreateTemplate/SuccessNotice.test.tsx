import { screen, waitFor, render } from "@testing-library/react";
import SuccessNotice from "@/components/CreateTemplate/SuccessNotice";
import userEvent from "@testing-library/user-event";
import React from "react";

describe("SuccessNotice", () => {
  it("should render successNotice page when user punish template successfully", () => {
    render(<SuccessNotice isOpen={true} onClose={() => void {}} />);
    const closeBtn = screen.getByRole("button", { name: "Close" });
    expect(
      screen.getByText("Congratulations You have successfully submitted a new template!")
    ).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
  });

  it("should not render successNotice when user click the close button", async () => {
    render(<SuccessNotice isOpen onClose={() => void {}} />);
    const closeBtn = screen.getByRole("button", { name: "Close" });
    userEvent.click(closeBtn);
    await waitFor(() => expect(closeBtn).not.toBeVisible());
    await waitFor(() =>
      expect(
        screen.getByText("Congratulations You have successfully submitted a new template!")
      ).not.toBeVisible()
    );
  });
});
