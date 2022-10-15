import CreateTemplate from "@/components/CreateTemplate";
import { userNameEllip } from "@/components/CreateTemplate/helpers/handleLongUserName";
import renderWithMockedProvider from "../../utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("Creat Template", () => {
  test("Should render all page titles", () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);

    const modalTitle = screen.getByText("Template sharing");
    const previewTitle = screen.getByText("Court Preview:");
    const nameTitle = screen.getByText("Court Name:");
    const descriptionTitle = screen.getByText("Description:");
    const publisherTitle = screen.getByText("Publisher:");

    expect(modalTitle).toBeInTheDocument;
    expect(previewTitle).toBeInTheDocument;
    expect(nameTitle).toBeInTheDocument;
    expect(descriptionTitle).toBeInTheDocument;
    expect(publisherTitle).toBeInTheDocument;
  });

  test("Should render buttons in modal footer", () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);

    const publishBtn = screen.getByRole("publishBtn");
    const cancelBtn = screen.getByRole("cancelBtn");

    expect(publishBtn).toBeInTheDocument;
    expect(cancelBtn).toBeInTheDocument;
  });

  it("Should provide correct user name with length limit", () => {
    const userFullName = "Test name";
    const maxLength = 4;
    expect(userNameEllip(userFullName, maxLength)).toBe("Test...");
  });

  it("Should show error massage when court name input reaches the maximum length", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const courtNameInput = screen.getByRole("courtNameInput");
    fireEvent.change(courtNameInput, { target: { value: "12345678901234567890" } });
    await waitFor(() => {
      expect(screen.getByText("CourtName cannot have more than 20 letters")).toBeVisible();
    });
  });

  it("The discription word count should correctly count the input description length", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const descriptionInput = screen.getByRole("textbox");
    fireEvent.change(descriptionInput, {
      target: { value: "This is my first basketball court template" },
    });
    await waitFor(() => {
      expect(screen.getByText("7/200 words")).toBeVisible();
    });
  });
});
