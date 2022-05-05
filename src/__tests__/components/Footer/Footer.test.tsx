import React from "react";
import renderWithMockedProvider from "../../test-utils";
import { screen } from "@testing-library/react";
import Footer, { FooterContent } from "../../../components/Footer";

describe("Footer", () => {
  it("shoud render footer success", () => {
    renderWithMockedProvider(<Footer />);
    expect(screen.getByText(FooterContent)).toBeInTheDocument();
  });
});
