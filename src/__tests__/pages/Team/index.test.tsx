import React from "react";
import renderWithMockedProvider from "../../utils";
import { screen, render } from "@testing-library/react";
import Team from "@/pages/team";

describe("team page", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.NEXT_PUBLIC_DESIGN_URL = "/";
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("should render team page successfully", () => {
    renderWithMockedProvider(<Team />);
    expect(screen.getByText("Meet the Team")).toBeInTheDocument();
  });

  it("should render the back to home button", () => {
    render(<Team />);
    const homePageElement = screen.getByText(/Take me back to homepage/i);
    expect(homePageElement).toBeInTheDocument();
  });
});
