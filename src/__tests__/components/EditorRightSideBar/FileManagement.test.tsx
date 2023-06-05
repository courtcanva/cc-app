import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FileManagement from "@/components/EditorRightSideBar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import renderWithMockedProvider from "../../utils";
import EditorDesignName from "../../../components/NavBar/EditorDesignName";
import userEvent from "@testing-library/user-event";

describe("FileManagement", () => {
  test("Each button in the File Management Component to display the correct text", () => {
    renderWithMockedProvider(<FileManagement />);

    const saveButtonElement = screen.getByTestId("save-btn");
    const downloadButton = screen.getByTestId("download-btn");
    const shareButtonElement = screen.getByText(/Share/i);

    expect(saveButtonElement).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
    expect(shareButtonElement).toBeInTheDocument();
    expect(shareButtonElement).toHaveTextContent("Share");
  });

  it("Should render Share button", () => {
    renderWithMockedProvider(<FileManagement />);

    const openButton = screen.getByTestId("share-btn");
    expect(openButton).toBeInTheDocument();
  });

  //   it("Should render login Modal when click share button", () => {
  //     renderWithMockedProvider(<FileManagement />);
  //     const shareButton = screen.getByTestId("share-btn");
  //     fireEvent.click(shareButton);
  //     // const loginModalDialog = screen.getByRole("dialog");
  //     // await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
  //     expect("Log in or sign up in seconds").toBeInTheDocument();
  //   });

  //   it("Should render login Modal when click save button", () => {
  //     renderWithMockedProvider(<FileManagement />);
  //     const saveBtn = screen.getByTestId("save-btn");
  //     fireEvent.click(saveBtn);
  //     // const loginModalDialog = screen.getByRole("dialog");
  //     // await waitFor(() => expect(screen.getByRole("dialog")).toBeVisible());
  //     expect("Log in or sign up in seconds").toBeInTheDocument();
  //   });
});

//Child component test
// describe("EditorDesignName", () => {
//     test("click the btn can show the input element", () => {
//         renderWithMockedProvider(<EditorDesignName />);
//         const btnElement = screen.getByLabelText("Edit");
//         const spanElement = screen.getByText("Court Canva 1");
//         const inputElement = screen.getByDisplayValue("Court Canva 1");

//         userEvent.click(btnElement);
//         expect(spanElement).toHaveAttribute("hidden");
//         expect(inputElement).not.toHaveAttribute("hidden");

//         userEvent.type(inputElement, "new design name");
//         expect(inputElement).toHaveValue("new design name");

//         userEvent.click(inputElement);
//         expect(spanElement.hidden).toBeTruthy();
//         expect(inputElement.hidden).toBeFalsy();
//         expect(spanElement.textContent).toEqual("new design name");
//     });
// });
