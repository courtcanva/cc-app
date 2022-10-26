import EmptyTmplate from "@/components/MyTemplate/EmptyTemplate";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("Empty My Template components", () => {
  test("Should render all empty elements", () => {
    renderWithMockedProvider(<EmptyTmplate />);
    const templateTitle = screen.getByText("My Template");
    const templateInfo = screen.getByTestId("emptyText");
    expect(templateTitle).toBeVisible();
    expect(templateInfo).toBeVisible();
  });
});
