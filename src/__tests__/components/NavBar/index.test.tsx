import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import NavigationBar from "@/components/NavBar";

describe("NavigationBar", () => {
  test("Each button in the navbar needs to display the correct text", () => {
    render(<NavigationBar />);

    const homeButtonElement = screen.getByText(/Home/i);
    const fileButtonElement = screen.getByText(/File/i);
    const shareButtonElement = screen.getByText(/Share/i);

    expect(homeButtonElement).toBeInTheDocument();
    expect(fileButtonElement).toBeInTheDocument();
    expect(shareButtonElement).toBeInTheDocument();
    expect(homeButtonElement).toHaveTextContent("Home");
    expect(fileButtonElement).toHaveTextContent("File");
    expect(shareButtonElement).toHaveTextContent("Share");
  });

  it("Should render Share button", () => {
    render(<NavigationBar />);

    const openButton = screen.getByTestId("share-btn");
    expect(openButton).toBeInTheDocument();
  });

  it("Should render login Modal when click button", async () => {
    render(<NavigationBar />);
    const shareButton = screen.getByTestId("share-btn");
    fireEvent.click(shareButton);
    const loginModalDialog = screen.getByRole("dialog");
    await waitFor(() => expect(loginModalDialog).toBeVisible());
  });
});
