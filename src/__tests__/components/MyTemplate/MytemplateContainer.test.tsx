import { mockTemplateData } from "@/components/MockData/MockTemplateData";
import MyTemplateContainer from "@/components/MyTemplate/MyTemplateContainer";
import { screen, within } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";
import moment from "moment";

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
        within(item).getByText(moment(mockTemplateData[index].createdAt).format("DD/MM/YYYY"))
      ).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].description)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].status)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].tags.CourtCategory)).toBeVisible();
      expect(within(item).getByText(mockTemplateData[index].tags.CourtType)).toBeVisible();
      expect(within(item).getByRole("button", { name: "Delete" })).toBeVisible();
      expect(within(item).getByRole("button", { name: "Undisplayed" })).toBeVisible();
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
});
