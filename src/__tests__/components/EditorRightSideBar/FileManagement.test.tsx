import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import FileManagement from "@/components/EditorRightSideBar";
import renderWithMockedProvider from "../../utils";
import { switchLoginModal, switchSideBar } from "../../../store/reducer/buttonToggleSlice";
import { resetAll } from "@/store/reducer/canvasControlSlice";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => {
    return { save: jest.fn() };
  });
});

describe("FileManagement", () => {
  test("Each button in the File Management Component to display the correct text", () => {
    renderWithMockedProvider(<FileManagement />);

    const saveButtonElement = screen.getByTestId("save-btn");
    const downloadButtonElement = screen.getByTestId("download-btn");
    const shareButtonElement = screen.getByText(/Share/i);

    expect(saveButtonElement).toBeInTheDocument();
    expect(downloadButtonElement).toBeInTheDocument();
    expect(shareButtonElement).toBeInTheDocument();
    expect(shareButtonElement).toHaveTextContent("Share");
  });

  it("Should render Share button", () => {
    renderWithMockedProvider(<FileManagement />);

    const openButton = screen.getByTestId("share-btn");
    expect(openButton).toBeInTheDocument();
  });

  it("Should render login Modal when click share button", async () => {
    const { getByTestId } = renderWithMockedProvider(<FileManagement />);
    fireEvent.click(getByTestId("share-btn"));

    expect(mockDispatch).toHaveBeenCalledWith(switchLoginModal(true));
  });

  it("Should render login Modal when click save button", async () => {
    const { getByTestId } = renderWithMockedProvider(<FileManagement />);

    const saveBtn = screen.getByTestId("save-btn");
    fireEvent.click(saveBtn);

    expect(mockDispatch).toHaveBeenCalledWith(switchLoginModal(true));
  });

  it("Should download PDF file when click download button", async () => {
    const { default: jsPDF } = await import(/* webpackChunkName: "jsPDF" */ "jspdf");
    const mockJSPDFInstance = new jsPDF();
    mockJSPDFInstance.save();

    const { getByTestId } = renderWithMockedProvider(<FileManagement />);

    const downloadBtn = screen.getByTestId("download-btn");
    fireEvent.click(downloadBtn);

    expect(mockDispatch).toHaveBeenCalledWith(switchSideBar(false));
    expect(mockDispatch).toHaveBeenCalledWith(resetAll());

    await waitFor(() => expect(mockJSPDFInstance.save).toHaveBeenCalled());
  });

  it("Should close Modal when click save button", async () => {
    const { getByTestId } = renderWithMockedProvider(<FileManagement />);

    const saveBtn = screen.getByTestId("save-btn");
    fireEvent.click(saveBtn);

    expect(mockDispatch).toHaveBeenCalledWith(switchLoginModal(true));
  });
});
