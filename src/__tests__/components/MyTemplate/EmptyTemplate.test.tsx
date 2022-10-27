import EmptyTemplate from "@/components/MyTemplate/EmptyTemplate";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("Empty My Template components", () => {
  it("Should render all empty elements", () => {
    renderWithMockedProvider(<EmptyTemplate />);
    const templateTitle = screen.getByText("My Template");
    const templateInfo = screen.getByTestId("emptyText");
    expect(templateTitle).toBeVisible();
    expect(templateInfo).toBeVisible();
  });
  it("Should render return to design button", () => {
    renderWithMockedProvider(<EmptyTemplate />);
    const returnBtn = screen.getByRole("button", { name: "RETURN TO DESIGN" });
    expect(returnBtn).toBeVisible();
  });
});
