import AddingToCartOverlay from "@/components/AddingToCartOverlay";
import { act, screen, waitFor } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";

jest.useFakeTimers();

describe("AddingToCartOverlay", () => {
  it("should render prompts correctly at different time", async () => {
    renderWithMockedProvider(<AddingToCartOverlay />);
    expect(screen.getByText("Generating design")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Generating construction")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Adding to cart")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(screen.queryByText(`Adding to cart failed, please try again`)).toBeInTheDocument();
  });
});
