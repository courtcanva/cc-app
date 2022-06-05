import { render, screen, fireEvent } from "@testing-library/react";
import EditorSideBar from "@/components/EditorSideBar";
import sideBarItemList from "@/components/EditorSideBar/const";

describe("EditorSideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    render(<EditorSideBar />);
    const bluePrintsText = screen.getByText("Blueprints");
    const elementsText = screen.getByText("Elements");
    const estimatorText = screen.getByText("Estimator");
    const previewText = screen.getByText("Preview");

    expect(bluePrintsText).toBeInTheDocument();
    expect(elementsText).toBeInTheDocument();
    expect(estimatorText).toBeInTheDocument();
    expect(previewText).toBeInTheDocument();
  });

  it("When clicking icon button and closing button should be working", () => {
    render(<EditorSideBar />);

    sideBarItemList.map((item) => {
      const element = screen.getByText(item.title);

      fireEvent.click(element);
      const closingBtn = screen.getByRole("button");
      expect(closingBtn).toBeInTheDocument();

      fireEvent.click(closingBtn);
      expect(closingBtn).not.toBeInTheDocument();

      fireEvent.click(element);
      fireEvent.click(element);
      expect(closingBtn).not.toBeInTheDocument();
    });
  });
});
