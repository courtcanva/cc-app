import { render, screen } from "@testing-library/react";
import Blueprints from "@/components/EditorSideBar/Blueprints";

describe("Blueprints", () => {
  it("Should render images", () => {
    render(<Blueprints />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(6);
  });
});
