import { render, screen } from "@testing-library/react";
import EditorSideBar from "../../../components/EditorSideBar";

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
});
