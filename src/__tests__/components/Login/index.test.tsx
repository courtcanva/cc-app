import LoginModalContent from "@/components/Login";
import renderWithMockedProvider from "../../utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("Login", () => {
  test("Each elements in the Login display the correct text", () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );

    const logoEl = screen.getByRole("logo");
    const googleButtonEl = screen.getByRole("button", { name: /google/i });
    const emailButtonEl = screen.getByRole("button", { name: /email/i });

    expect(logoEl).toBeInTheDocument();
    expect(googleButtonEl).toBeInTheDocument();
    expect(emailButtonEl).toBeInTheDocument();
    expect(googleButtonEl).toHaveTextContent("Continue with Google");
    expect(emailButtonEl).toHaveTextContent("Continue with Email");
  });

  it("Should close Modal when click close button", async () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );
    const closeButton = screen.getByRole("closeButton");
    fireEvent.click(closeButton);
    const loginModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(loginModalDialog).not.toBeVisible());
  });
});
