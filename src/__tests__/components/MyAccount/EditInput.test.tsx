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

  it("should show error message when users input invalid password information", async () => {
    const editPsw = screen.getByText(/change password/i);
    userEvent.click(editPsw);
    const oldPswInput = screen.getByLabelText("Enter your password");
    const newPswInput = screen.getByLabelText("New password");
    const confirmPswInput = screen.getByLabelText("Confirm new password");
    const applyBtn = screen.getByRole("button", { name: /apply/i });
    userEvent.type(oldPswInput, "123456");
    userEvent.type(newPswInput, "1234567");
    userEvent.type(confirmPswInput, "1234567");
    userEvent.click(applyBtn);
    const invalidMsg = screen.getByText(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character!"
    );
    await waitFor(() => {
      expect(invalidMsg).toBeVisible();
    });
    userEvent.type(newPswInput, "1234567~Ab");
    userEvent.type(confirmPswInput, "123456~Ab");
    userEvent.click(applyBtn);
    const notMatchMsg = screen.getByText("Password does not match!");
    await waitFor(() => {
      expect(notMatchMsg).toBeVisible();
    });
  });

  it("should show password content when users click eye icon", async () => {
    const editPsw = screen.getByText(/change password/i);
    userEvent.click(editPsw);
    const oldPswInput = screen.getByLabelText("Enter your password");
    const newPswInput = screen.getByLabelText("New password");
    const confirmPswInput = screen.getByLabelText("Confirm new password");
    const eyeIcons = screen.getAllByTestId("eyeIcon");
    eyeIcons.forEach((eyeIcon) => {
      userEvent.click(eyeIcon);
    });
    await waitFor(() => {
      expect(oldPswInput.getAttribute("type")).toEqual("text");
      expect(newPswInput.getAttribute("type")).toEqual("text");
      expect(confirmPswInput.getAttribute("type")).toEqual("text");
    });
  });
});
