import { act, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Blueprints from "@/components/EditorSideBar/Blueprints";
import renderWithMockedProvider from "../../utils";
import TopBar from "@/components/TopBar";
import courtList from "@/components/ChangeCourtSize/CourtList";

describe("Blueprints", () => {
  const data = [
    {
      centreCircleRadius: 1800,
      createdAt: "2022-09-05T11:06:44.701Z",
      description: "Pro Full Court",
      isDeleted: false,
      isHidden: false,
      length: 28000,
      lengthOfCorner: 1575,
      lineBorderWidth: 200,
      name: "Pro Full Court",
      restrictedAreaLength: 5790,
      restrictedAreaWidth: 4900,
      sideBorderWidth: 1000,
      threePointLine: 900,
      threePointRadius: 6600,
      updatedAt: "2022-10-13T06:22:30.620Z",
      width: 15000,
      _id: "6315d8448dec97602bb7a2fd",
    },
  ];
  it("Should render images", () => {
    renderWithMockedProvider(<Blueprints fetchedCourtsData={data} />);
    const imgElements = screen.getAllByRole("img");
    expect(imgElements.length).toBe(1);
  });
});
