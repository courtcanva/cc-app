import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NavigationBar from "@/components/NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import renderWithMockedProvider from "../../utils";

describe("NavigationBar", () => {
  test("Each button in the navbar needs to display the correct text", () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <NavigationBar />
      </GoogleOAuthProvider>
    );

    const homeButtonElement = screen.getByText(/Home/i);
    // const shareButtonElement = screen.getByText(/Share/i);

    expect(homeButtonElement).toBeInTheDocument();
    // expect(shareButtonElement).toBeInTheDocument();
    expect(homeButtonElement).toHaveTextContent("Home");
    // expect(shareButtonElement).toHaveTextContent("Share");
  });

  // it("Should render Share button", () => {
  //   renderWithMockedProvider(
  //     <GoogleOAuthProvider clientId="testid">
  //       <NavigationBar />
  //     </GoogleOAuthProvider>
  //   );

  //   const openButton = screen.getByTestId("share-btn");
  //   expect(openButton).toBeInTheDocument();
  // });

  // it("Should render login Modal when click button", async () => {
  //   renderWithMockedProvider(
  //     <GoogleOAuthProvider clientId="testid">
  //       <NavigationBar />
  //     </GoogleOAuthProvider>
  //   );
  //   const shareButton = screen.getByTestId("share-btn");
  //   fireEvent.click(shareButton);
  //   const loginModalDialog = screen.getByRole("dialog");
  //   await waitFor(() => expect(loginModalDialog).toBeVisible());
  // });
});
