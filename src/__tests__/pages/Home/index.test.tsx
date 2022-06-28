import renderWithMockedProvider from "../../utils";
import Home from "../../../pages";

describe("Home Page", () => {
  it("should render homepage success", () => {
    renderWithMockedProvider(<Home />);
  });
});
