import React from "react";
import renderWithMockedProvider from "../../utils";
import { screen, render } from "@testing-library/react";
import Custom404 from "@/pages/404";

describe("404 not found", () => {
  it("should render 404 page successfully", () => {
    renderWithMockedProvider(<Custom404 />);
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("should render the unsmile image", () => {
    render(<Custom404 />);
    const unSmile = screen.getByTestId("unSmile");
    expect(unSmile).toBeInTheDocument();
  });

  it("should render the back to home button", () => {
    render(<Custom404 />);
    const notFoundPageElement = screen.getByText(/Take me back to homepage/i);
    expect(notFoundPageElement).toBeInTheDocument();
  });
});
