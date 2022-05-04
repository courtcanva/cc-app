import React from "react";
import renderWithMockedProvider from "../../test-utils";
import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Home from "../../../pages";

describe("Home Page", () => {
  it("should render homepage success", () => {
    renderWithMockedProvider(<Home />);
    expect(screen.getByText("Welcome to CourtCanva")).toBeInTheDocument();
  });
  it("should trigger number change when click different button", async () => {
    renderWithMockedProvider(<Home />);
    expect(screen.getByText("0")).toBeInTheDocument();
    act(() => {
      user.click(screen.getByText("Increment"));
    });
    expect(await screen.findByText("1")).toBeInTheDocument();
    act(() => {
      user.click(screen.getByText("Plus 100"));
    });
    expect(await screen.findByText("101")).toBeInTheDocument();
    act(() => {
      user.click(screen.getByText("Decrement"));
    });
    expect(await screen.findByText("100")).toBeInTheDocument();
    act(() => {
      user.click(screen.getByText("Clear"));
    });
    expect(await screen.findByText("0")).toBeInTheDocument();
  });
});
