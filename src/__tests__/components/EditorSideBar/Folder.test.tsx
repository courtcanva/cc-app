import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Folder from "@/components/EditorSideBar/Folder";
import renderWithMockedProvider from "../../utils";
import TopBar from "@/components/TopBar";
import courtList from "@/components/ChangeFolderItem/CourtList";

describe("Folder", () => {
  it("Should render images", () => {
    renderWithMockedProvider(<Folder />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(6);
  });

  test("Click on a specific blueprint to display a specific title", async () => {
    renderWithMockedProvider(<Folder />);

    courtList.forEach((court) => {
      act(() => user.click(screen.getByTestId(court.img)));
      renderWithMockedProvider(<TopBar />);
      expect(screen.findAllByText(court.courtSizeName)).toBeTruthy();
    });
  });

  test("activated blueprint should be highlight", () => {
    renderWithMockedProvider(<Folder />);

    courtList.forEach((court) => {
      const courtImg = screen.getByTestId(court.img);

      act(() => user.click(courtImg));
      renderWithMockedProvider(<TopBar />);
      expect(courtImg).toHaveStyle("opacity: 1");
    });
  });
});
