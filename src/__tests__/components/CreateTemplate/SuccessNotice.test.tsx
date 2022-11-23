import { screen, waitFor } from "@testing-library/react";
import SuccessNotice from "@/components/CreateTemplate/SuccessNotice";
import userEvent from "@testing-library/user-event";
import React from "react";
import renderWithMockedProvider from "../../utils";

describe("SuccessNotice", () => {
  it("should render successNotice page when user punish template successfully", () => {
    renderWithMockedProvider(<SuccessNotice isOpen={true} onClose={() => void {}} />);
    const closeBtn = screen.getByRole("button", { name: "Close" });
    const goMyTemplateBtn = screen.getByRole("button", { name: "My Template" });
    expect(
      screen.getByText("Congratulations, you have successfully submitted a new template!")
    ).toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();
    expect(goMyTemplateBtn).toBeInTheDocument();
  });

  it("should not render successNotice when user click the close button", async () => {
    renderWithMockedProvider(<SuccessNotice isOpen onClose={() => void {}} />);
    const closeBtn = screen.getByRole("button", { name: "Close" });
    userEvent.click(closeBtn);
    await waitFor(() => expect(closeBtn).not.toBeVisible());
    await waitFor(() =>
      expect(
        screen.getByText("Congratulations, you have successfully submitted a new template!")
      ).not.toBeVisible()
    );
  });
});
