import { render, screen, fireEvent } from "@testing-library/react";
import EditorDesignName from "../../../components/NavBar/EditorDesignName";

describe("EditorDesignName", () => {
  test("click the btn can edit the name", () => {
    render(<EditorDesignName />);
    const btnElement = screen.getByLabelText("Edit");
    const spanElement = screen.getByText("Court Canva 1");
    const inputElement = screen.getByDisplayValue("Court Canva 1");

    fireEvent.click(btnElement);
    expect(spanElement).toHaveAttribute("hidden");
    expect(inputElement).not.toHaveAttribute("hidden");
    
    fireEvent.change(inputElement, { target: { value: "new design name" } });
    expect(inputElement).toHaveDisplayValue("new design name");
    
    fireEvent.submit(inputElement);
    expect(spanElement.hidden).toBeTruthy();
    expect(inputElement.hidden).toBeFalsy();
  });
});
