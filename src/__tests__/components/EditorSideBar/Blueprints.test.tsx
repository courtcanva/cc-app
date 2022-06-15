import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Blueprints from "@/components/EditorSideBar/Blueprints";
import renderWithMockedProvider from "../../utils";
import TopBar from "@/components/TopBar";

describe("Blueprints", () => {
  it("Should render images", () => {
    renderWithMockedProvider(<Blueprints />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(6);
  });

  test("Click on a specific blueprint to display a specific title", async () => {
    renderWithMockedProvider(<Blueprints />);

    act(() => user.click(screen.getByTestId("./courtSize/court-510m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/510 ㎡ Pro Court/i)).toBeTruthy();

    act(() => user.click(screen.getByTestId("./courtSize/court-420m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/420 ㎡ Full Court/i)).toBeTruthy();

    act(() => user.click(screen.getByTestId("./courtSize/court-45m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/45 ㎡ Small Court/i)).toBeTruthy();

    act(() => user.click(screen.getByTestId("./courtSize/court-210m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/210 ㎡ Pro Half Court/i)).toBeTruthy();

    act(() => user.click(screen.getByTestId("./courtSize/court-150m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/150 ㎡ Half Court/i)).toBeTruthy();

    act(() => user.click(screen.getByTestId("./courtSize/court-70m2.png")));
    renderWithMockedProvider(<TopBar />);
    expect(await screen.findAllByText(/70 ㎡ Medium Court/i)).toBeTruthy();
  });
});
