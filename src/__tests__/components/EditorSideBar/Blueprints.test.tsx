import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Blueprints from "@/components/EditorSideBar/Blueprints";
import renderWithMockedProvider from "../../utils";
import TopBar from "@/components/TopBar";
import courtList from "@/components/ChangeCourtSize/CourtList";

describe("Blueprints", () => {
  it("Should render images", () => {
    renderWithMockedProvider(<Blueprints />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(6);
  });
});
