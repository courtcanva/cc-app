import { mockTemplateData } from "@/components/MockData/MockTemplateData";
import MyTemplateContainer from "@/components/MyTemplate/MyTemplateContainer";
import { waitFor, screen, fireEvent, render, within } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";

describe("MyTemplate component", () => {
  it("should render template title", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const myTemplateTitle = screen.getByText("My Template");
    expect(myTemplateTitle).toBeInTheDocument();
  });

  it("Should render template list items correctly", () => {
    renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
    const listItems = screen.getAllByTestId("templateListItems");
    const templateLength = mockTemplateData?.length;
    expect(listItems.length).toBe(templateLength);
  });

  // it("Should render correct the item data of template items", () => {
  //   renderWithMockedProvider(<MyTemplateContainer myTemplates={mockTemplateData} />);
  //   const listItems = screen.getAllByTestId("templateListItems");
  //   listItems.forEach((item, index) => {
  //     expect(within(item)).toHaveTextContent(mockTemplateData[index].courtName);
  //   });
  // });
});
