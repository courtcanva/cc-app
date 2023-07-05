import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NavigationBar from "@/components/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import renderWithMockedProvider from "../../utils";
import userEvent from "@testing-library/user-event";

describe("NavigationBar", () => {
  test("Each button in the navbar needs to display the correct text", () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <NavigationBar />
      </GoogleOAuthProvider>
    );

    const homeButtonElement = screen.getByText(/Home/i);

    expect(homeButtonElement).toBeInTheDocument();
    expect(homeButtonElement).toHaveTextContent("Home");
  });
});
