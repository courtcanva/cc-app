import { screen } from "@testing-library/react";
import EditorDesignName from "../../../components/NavBar/EditorDesignName";
import userEvent from "@testing-library/user-event";
import renderWithMockedProvider from "../../utils";

describe("EditorDesignName", () => {
  test("click the btn can show the input element", () => {
    renderWithMockedProvider(<EditorDesignName />);
    const btnElement = screen.getByLabelText("Edit");
    const spanElement = screen.getByText("Court Canva 1");
    const inputElement = screen.getByDisplayValue("Court Canva 1");

    userEvent.click(btnElement);
    expect(spanElement).toHaveAttribute("hidden");
    expect(inputElement).not.toHaveAttribute("hidden");

    userEvent.type(inputElement, "new design name");
    expect(inputElement).toHaveValue("new design name");

    userEvent.click(inputElement);
    expect(spanElement.hidden).toBeTruthy();
    expect(inputElement.hidden).toBeFalsy();
  });
  test("show feedback modal when invalid name was input", () => {
    renderWithMockedProvider(<EditorDesignName />);
    const btnElement = screen.getByLabelText("Edit");
    const inputElement = screen.getByDisplayValue("Court Canva 1");

    userEvent.click(btnElement);
    userEvent.type(inputElement, "new design name-!");
    userEvent.click(document.body);
    const feedbackModal = screen.getByRole("dialog");
    expect(feedbackModal).toBeInTheDocument();
    expect(screen.getByText(/not a valid name/i)).toBeInTheDocument();

    const closeBtnEl = screen.getByText("Close");
    userEvent.click(closeBtnEl);
    expect(feedbackModal).not.toBeVisible();
    expect(inputElement).toHaveValue("Court Canva 1");
  });
});
