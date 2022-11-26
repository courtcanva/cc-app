import renderWithMockedProvider from "../../utils";
import ImageEditingContainer from "@/components/ImageEditing/ImageEditingContainer";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Image editing", () => {
  it("should render Image Editing popup, and invisible after click close button", () => {
    renderWithMockedProvider(<ImageEditingContainer isOpen={true} onClose={() => void {}} />);

    const popupTitle = screen.getByText(/change your avatar/i);
    const chooseImageButton = screen.getByText(/choose an image/i);
    const zoomText = screen.getByText(/zoom/i);
    const rotationText = screen.getByText(/rotation/i);
    const resetButton = screen.getByRole("button", { name: /reset/i });
    const applyButton = screen.getByRole("button", { name: /apply/i });
    const dragAreaText = screen.getByText(/or drag image to this area/i);
    const closeButton = screen.getByRole("button", { name: /close/i });

    expect(popupTitle).toBeInTheDocument();
    expect(chooseImageButton).toBeInTheDocument();
    expect(zoomText).toBeInTheDocument();
    expect(rotationText).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(applyButton).toBeInTheDocument();
    expect(dragAreaText).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(popupTitle).not.toBeVisible();
    expect(chooseImageButton).not.toBeVisible();
    expect(zoomText).not.toBeVisible();
    expect(rotationText).not.toBeVisible();
    expect(resetButton).not.toBeVisible();
    expect(applyButton).not.toBeVisible();
    expect(dragAreaText).not.toBeVisible();
    expect(closeButton).not.toBeVisible();
  });

  it("should hide drag area when user input an image", () => {
    renderWithMockedProvider(<ImageEditingContainer isOpen={true} onClose={() => void {}} />);

    const dragAreaText = screen.getByText(/or drag image to this area/i);
    const testFile = new File(["test"], "test.png", { type: "image/png" });
    const input = screen.getByTestId("fileInput");
    userEvent.upload(input, testFile);

    expect(dragAreaText).not.toBeVisible();
  });
});
