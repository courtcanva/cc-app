import { render, screen } from "@testing-library/react";
import EditorDesignName from "../../../components/NavBar/EditorDesignName";
import userEvent from "@testing-library/user-event";

describe("EditorDesignName", () => {
  test("click the btn can show the input element", () => {
    render(<EditorDesignName />);
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
});
