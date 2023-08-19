import Construction from "@/components/Construction";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import renderWithMockedProvider from "../../utils";

jest.mock("@/components/Construction/CourtConstruction", () => {
  return function MockConstructionComponent() {
    return <div>mockDiv</div>;
  };
});

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Construction", () => {
  const MockButtonComponent = () => {
    return <button id="constructionButton">mockButton</button>;
  };
  beforeEach(() => {
    render(<MockButtonComponent />);
    renderWithMockedProvider(<Construction />);
  });

  it("should display CourtConstruction and closeButton", async () => {
    expect(await screen.findByText("mockDiv")).toBeInTheDocument();
    expect(await screen.findByText("Construction Off")).toBeInTheDocument();
  });

  it("should call dispatch when close button is clicked", async () => {
    const mockButton = await screen.findByText("Construction Off");
    userEvent.click(mockButton);
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });
  });
});
