import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TopBar from "@/components/TopBar";
import renderWithMockedProvider from "../../utils";

describe("TopBar", () => {
  it("should render court name", () => {
    renderWithMockedProvider(<TopBar />);
  });

  it("should render width text", () => {
    renderWithMockedProvider(<TopBar />);
    const borderWidthTextElement = screen.getByText(/width/i);

    expect(borderWidthTextElement).toBeInTheDocument();
    expect(borderWidthTextElement).toHaveTextContent("width");
  });

  it("should render color select button", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("colorSelectBtn")).toBeTruthy();
  });

  it("should render upload image btn", () => {
    renderWithMockedProvider(<TopBar />);
    expect(screen.getByTestId("uploadBtn")).toBeTruthy();
  });

  it("Should render Share button", () => {
    renderWithMockedProvider(<TopBar />);

    const downloadButton = screen.getByTestId("download-btn");
    expect(downloadButton).toBeInTheDocument();
  });

  // it("Should render login Modal when click button", async () => {
  //   renderWithMockedProvider(<TopBar />);
  //   const downloadButton = screen.getByTestId("download-btn");
  //   fireEvent.click(downloadButton);
  //   // TODO: Add this test after finishing putting user login status into redux
  //   // const loginModalDialog = screen.getByRole("dialog");
  //   // await waitFor(() => expect(loginModalDialog).toBeVisible());
  // });

  // // it("Should dispatch the action", () => {
  // //   const dispatchAction = jest.spyOn(redux, "useDispatch");
  // //   render(<TopBar />);
  // //   expect(dispatchAction).toHaveBeenCalled();
  // // });
});
