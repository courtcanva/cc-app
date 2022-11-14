import { mockTemplateData } from "@/components/MockData/MockTemplateData";
import MyTemplateContainer from "@/components/MyTemplate/MyTemplateContainer";
import { screen, within } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";
import { format, parseISO } from "date-fns";
import userEvent from "@testing-library/user-event";

describe("MyTemplate component", () => {
  it("should render template title", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const myTemplateTitle = screen.getByText("My Template");
    expect(myTemplateTitle).toBeInTheDocument();
  });

  it("Should render template list items correctly", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const listItems = screen.getAllByTestId("templateListItems");
    const templateLength = mockTemplateData.length;
    expect(listItems.length).toBe(templateLength);
  });

  it("Should render correct item data of template items", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const listItems = screen.getAllByTestId("templateListItems");
    listItems.forEach((item, index) => {
      expect(within(item).getByText(mockTemplateData[index].courtName)).toBeVisible();
      expect(
        within(item).getByText(format(parseISO(mockTemplateData[index].createdAt), "dd/MM/yyyy"))
      ).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].description)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].status)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].tags.CourtCategory)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].tags.CourtType)).toBeVisible();
      expect(within(item).getByRole("button", { name: "Delete" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "Undisplay" })).toBeVisible();
    });
  });

  it("Should render return to design button", async () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const returnBtn = screen.getByRole("button", { name: "Return To Design" });
    expect(returnBtn).toBeVisible();
  });

  it("Should render emplaty text then template data is null", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={undefined} />);
    const templateTitle = screen.getByText("My Template");
    const templateInfo = screen.getByTestId("emptyText");
    expect(templateTitle).toBeVisible();
    expect(templateInfo).toBeVisible();
  });

  it("Should open alert dialog when delete/undisplay button is clicked", async () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={[mockTemplateData[0]]} />);

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    const undisplayBtn = screen.getByRole("button", { name: "Undisplay" });

    userEvent.click(deleteBtn);
    const deleteAlert = screen.getByRole("dialog");
    expect(deleteAlert).toBeInTheDocument();
    const deleteAlertText = screen.getByText(
      "Are you sure you want to permanently delete your template?"
    );
    expect(deleteAlertText).toBeInTheDocument();

    userEvent.click(undisplayBtn);
    const undisplayAlert = screen.getByRole("dialog");
    expect(undisplayAlert).toBeInTheDocument();
    const undisplayAlertText = screen.getByText(
      "Are you sure you want to undisplay your template?"
    );
    expect(undisplayAlertText).toBeInTheDocument();
  });
});
