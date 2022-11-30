import CustomiseWindow from "@/components/ProHalfCourt/CustomiseWindow";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("CustomiseWindow.test", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setClipLength = () => {};
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const setClipWidth = () => {};
    render(<CustomiseWindow setInputLength={setClipLength} setInputWidth={setClipWidth} />);
  });

  it("should render Customize Window correctly and have click function", async () => {
    const headWindow = screen.getByTestId("headWindow");
    expect(headWindow).toBeVisible();
    userEvent.click(headWindow);
    await waitFor(() => expect(screen.getByTestId("bodyWindow")).toBeVisible());
    userEvent.click(headWindow);
    await waitFor(() => expect(screen.getByTestId("bodyWindow")).not.toBeVisible());
  });
  it("only allow input number in the input filed", () => {
    const widthInput = screen.getByTestId("WidthInput");
    const lengthInput = screen.getByTestId("LengthInput");
    userEvent.type(widthInput, "abcTest");
    userEvent.type(lengthInput, "abcTest");
    expect(widthInput).toHaveValue(null);
    expect(lengthInput).toHaveValue(null);
    userEvent.type(widthInput, "10");
    userEvent.type(lengthInput, "8");
    expect(widthInput).toHaveValue(10);
    expect(lengthInput).toHaveValue(8);
  });

  it("should show error message correctly", () => {
    const widthInput = screen.getByTestId("WidthInput");
    const lengthInput = screen.getByTestId("LengthInput");
    const setBtn = screen.getByTestId("setBtn");
    userEvent.type(widthInput, "1");
    userEvent.type(lengthInput, "20");
    userEvent.click(setBtn);
    expect(
      screen.getByText("Width must be between 2m and 14m and length must be between 2m and 15m.")
    ).toBeInTheDocument();
  });

  it("should reset value by clicking reset bottom", () => {
    const widthInput = screen.getByTestId("WidthInput");
    const lengthInput = screen.getByTestId("LengthInput");
    const resetBtn = screen.getByTestId("resetBtn");
    userEvent.type(widthInput, "10");
    userEvent.type(lengthInput, "12");
    fireEvent.click(resetBtn);
    expect(widthInput).toHaveValue(null);
    expect(lengthInput).toHaveValue(null);
  });

  it("should have correct onBlur effect", () => {
    const widthInput = screen.getByTestId("WidthInput");
    const lengthInput = screen.getByTestId("LengthInput");
    userEvent.tab();
    fireEvent.focus(widthInput);
    userEvent.type(widthInput, "1");
    userEvent.tab();
    fireEvent.focusOut(widthInput);
    expect(
      screen.getByText("Width must be between 2m and 14m and length must be between 2m and 15m.")
    ).toBeInTheDocument();
    userEvent.tab();
    fireEvent.focus(lengthInput);
    userEvent.type(lengthInput, "20");
    userEvent.tab();
    fireEvent.focusOut(lengthInput);
    expect(
      screen.getByText("Width must be between 2m and 14m and length must be between 2m and 15m.")
    ).toBeInTheDocument();
  });
});
