import { render, screen } from "@testing-library/react";
import SideBar from "../../../components/SideBar/SideBar";

describe("SideBar component", () => {
  test("Each box in the sidebar should render the correct text", () => {
    render(<SideBar />);
    const bluePrintsText = screen.getByText("Blueprints");
    const elementsText = screen.getByText("Elements");
    const estimatorText = screen.getByText("Estimator");
    const previewText = screen.getByText("Preview");

    expect(bluePrintsText).toBeInTheDocument();
    expect(elementsText).toBeInTheDocument();
    expect(estimatorText).toBeInTheDocument();
    expect(previewText).toBeInTheDocument();
  });

  test("Four link-link should be rendered in the sidebar", () => {
    render(<SideBar />);
    const blueprintsLinkElement = screen.getByTestId("Blueprints");
    const elementsLinkElement = screen.getByTestId("Elements");
    const estimatorLinkElement = screen.getByTestId("Estimator");
    const previewLinkElement = screen.getByTestId("Preview");

    expect(blueprintsLinkElement).toBeInTheDocument();
    expect(elementsLinkElement).toBeInTheDocument();
    expect(estimatorLinkElement).toBeInTheDocument();
    expect(previewLinkElement).toBeInTheDocument();
  });
});
