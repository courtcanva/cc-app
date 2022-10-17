import CreateTemplate from "@/components/CreateTemplate";
import { userNameEllip } from "@/utils/handleLongUserName";
import renderWithMockedProvider from "../../utils";
import { fireEvent, screen, waitFor } from "@testing-library/react";

// NOTE: 这里的fireEvent 看要不要改成userEvent，功能上差不多，之前罗老师说尽量用userEvent 不要用fireEvent
describe("Creat Template", () => {
  test("Should render all page titles", () => {
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

  test("Should render buttons in modal footer", () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);

    const publishBtn = screen.getByRole("publishBtn");
    const cancelBtn = screen.getByRole("cancelBtn");

    expect(publishBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });

  it("Should show error massage when court name input reaches the maximum length", async () => {
    renderWithMockedProvider(<CreateTemplate isOpen={true} onClose={() => void {}} />);
    const courtNameInput = screen.getByRole("courtNameInput");
    fireEvent.change(courtNameInput, { target: { value: "12345678901234567890" } });
    await waitFor(() => {
      expect(screen.getByText("Court name cannot have more than 15 characters")).toBeVisible();
    });
    // fireEvent.change(courtNameInput, { target: { value: "" } });
    // await waitFor(() => {
    //   expect(screen.getByText("Court name cannot be empty")).toBeVisible();
    // });
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
