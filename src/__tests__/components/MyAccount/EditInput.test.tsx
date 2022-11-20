import MyAccountContainer from "@/components/MyAccount/MyAccountContainer";
import renderWithMockedProvider from "../../utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("EditInput test", () => {
  beforeEach(() => {
    renderWithMockedProvider(<MyAccountContainer />);
  });
  it("should render pop up window for editing after click corresponding buttons", async () => {
    const editNameBtn = screen.getByRole("button", { name: /edit name/i });
    const editPsw = screen.getByRole("button", { name: /change password/i });
    userEvent.click(editNameBtn);
    const editNameWindow = screen.getByRole("dialog", { name: /change your name/i });
    await waitFor(() => expect(editNameWindow).toBeVisible());
    userEvent.click(editPsw);
    const editPswWindow = screen.getByRole("dialog", { name: /change your password/i });
    await waitFor(() => expect(editPswWindow).toBeVisible());
  });
  it("should close pop up window after submit input form ", async () => {
    const editNameBtn = screen.getByRole("button", { name: /edit name/i });
    userEvent.click(editNameBtn);
    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    userEvent.type(firstNameInput, "abcTest");
    userEvent.type(lastNameInput, "abcTest");
    const applyBtn = screen.getByRole("button", { name: /apply/i });
    const editNameWindow = screen.getByRole("dialog", { name: /change your name/i });
    userEvent.click(applyBtn);
    await waitFor(() => {
      expect(editNameWindow).not.toBeVisible();
    });
  });

  it("should show error message when users input invalid password information", () => {
    const editPsw = screen.getByText(/change password/i);
    userEvent.click(editPsw);
    const oldPswInput = screen.getByLabelText(/Enter your password/i);
    const newPswInput = screen.getByLabelText("New password");
    const confirmPswInput = screen.getByLabelText(/Confirm new password/i);
  });
});
