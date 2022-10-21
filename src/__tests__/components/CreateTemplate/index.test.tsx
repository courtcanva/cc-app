import CreateTemplate from "@/components/CreateTemplate";
import renderWithMockedProvider from "../../utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Create Template", () => {
  it("Should render all page titles", () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);

    const modalTitle = screen.getByText("Template sharing");
    const previewTitle = screen.getByText("Court Preview:");
    const nameTitle = screen.getByText("Template Court Name:");
    const descriptionTitle = screen.getByText("Description:");
    const publisherTitle = screen.getByText("Publisher:");

    expect(modalTitle).toBeInTheDocument();
    expect(previewTitle).toBeInTheDocument();
    expect(nameTitle).toBeInTheDocument();
    expect(descriptionTitle).toBeInTheDocument();
    expect(publisherTitle).toBeInTheDocument();
  });

  it("Should render buttons in modal footer", () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);

    const publishBtn = screen.getByRole("button", { name: "Publish" });
    const cancelBtn = screen.getByRole("button", { name: "Cancel" });

    expect(publishBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it("Should show error massage when court name input reaches the maximum length or court name input is empty", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const courtNameInput = screen.getByRole("textbox", { name: "courtNameInput" });
    userEvent.type(courtNameInput, "12345678901234567890");
    await waitFor(() => {
      expect(screen.getByText("Court name cannot have more than 15 characters")).toBeVisible();
    });
    userEvent.clear(courtNameInput);
    await waitFor(() => {
      expect(screen.getByText("Court name cannot be empty")).toBeVisible();
    });
  });

  it("Should show error message when click punish button and court name is empty", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const publishBtn = screen.getByRole("button", { name: "Publish" });
    userEvent.click(publishBtn);
    await waitFor(() => {
      expect(screen.getByText("Court name cannot be empty")).toBeVisible();
    });
  });

  it("Error message should disappear when court name length is not empty", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const courtNameInput = screen.getByRole("textbox", { name: "courtNameInput" });
    userEvent.type(courtNameInput, "1");
    await waitFor(() => {
      expect(screen.getByText("Court name cannot be empty")).not.toBeVisible();
    });
  });

  it("The description word count should correctly count the input description length", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const descriptionInput = screen.getByRole("textbox", { name: "textArea" });
    userEvent.type(descriptionInput, "This my bag");
    await waitFor(() => {
      expect(screen.getByText("11/200 letters")).toBeVisible();
    });
  });
});
