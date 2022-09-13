import LoginModalContent from "@/components/Login";
import renderWithMockedProvider from "../../utils";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("Login", () => {
  it("Should display email login after clicking email button", async () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );

    const emailButtonEl = screen.getByRole("button", { name: /email/i });
    fireEvent.click(emailButtonEl);
    await waitFor(() => {
      const logoEl = screen.getByRole("logo");
      const inputEl = screen.getByRole("emailInput");
      const continueButton = screen.getByRole("button", { name: /continue/i });
      expect(logoEl).toBeInTheDocument();
      expect(screen.getByText("Continue with Email")).toBeInTheDocument();
      expect(screen.getByText("Enter your email address!")).toBeInTheDocument();
      expect(inputEl).toBeInTheDocument();
      expect(continueButton).toBeInTheDocument();
    });
  });

  it("Should go back to select login way after clicking back button", async () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );
    const emailButtonEl = screen.getByRole("button", { name: /email/i });
    fireEvent.click(emailButtonEl);
    const backButton = screen.getByRole("goBack");
    fireEvent.click(backButton);
    await waitFor(() => {
      const googleButtonEl = screen.getByRole("button", { name: /google/i });
      expect(googleButtonEl).toBeInTheDocument();
    });
  });

  it("Should show error message if an invalid email is input - on button click", async () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );
    const emailButtonEl = screen.getByRole("button", { name: /email/i });
    fireEvent.click(emailButtonEl);
    const inputEl = screen.getByRole("emailInput");
    const continueButton = screen.getByRole("button", { name: /continue/i });
    fireEvent.change(inputEl, { target: { value: "123" } });
    fireEvent.click(continueButton);
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email!")).toBeInTheDocument();
    });
  });

  it("Should show error message if an invalid email is input - on key press enter", async () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
      </GoogleOAuthProvider>
    );
    const emailButtonEl = screen.getByRole("button", { name: /email/i });
    fireEvent.click(emailButtonEl);
    const inputEl = screen.getByRole("emailInput");
    fireEvent.change(inputEl, { target: { value: "123" } });
    fireEvent.keyPress(inputEl, { key: "Enter", code: "Enter", charCode: 13 });
    await waitFor(() => {
      expect(screen.getByText("Please enter a valid email!")).toBeInTheDocument();
    });
  });

  // it("Should check email if exist or not - on button click", async () => {
  //   renderWithMockedProvider(
  //     <GoogleOAuthProvider clientId="testid">
  //       <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
  //     </GoogleOAuthProvider>
  //   );
  //   const emailButtonEl = screen.getByRole("button", { name: /email/i });
  //   fireEvent.click(emailButtonEl);
  //   const inputEl = screen.getByRole("emailInput");
  //   const continueButton = screen.getByRole("button", { name: /continue/i });
  //   fireEvent.change(inputEl, { target: { value: "test@gmail.com" } });
  //   fireEvent.click(continueButton);
  //   await waitFor(() => {
  //     expect(screen.getByText("Sign up with test@gmail.com")).toBeInTheDocument();
  //   });
  // });

  //   it("Should check email if exist or not - - on key press enter", async () => {
  //     renderWithMockedProvider(
  //       <GoogleOAuthProvider clientId="testid">
  //         <LoginModalContent isOpen onClose={() => void {}} updateLoginData={() => void {}} />
  //       </GoogleOAuthProvider>
  //     );
  //     const emailButtonEl = screen.getByRole("button", { name: /email/i });
  //     fireEvent.click(emailButtonEl);
  //     const inputEl = screen.getByRole("emailInput");
  //     fireEvent.change(inputEl, { target: { value: "test@gmail.com" } });
  //     fireEvent.keyPress(inputEl, { key: "Enter", code: "Enter", charCode: 13 });
  //     await waitFor(() => {
  //       expect(screen.getByText("Sign up with test@gmail.com")).toBeInTheDocument();
  //     });
  //   });
});
