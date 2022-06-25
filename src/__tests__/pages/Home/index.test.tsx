import renderWithMockedProvider from "../../utils";
import Home from "../../../pages";
// import * as redux from "react-redux";

// const spy = jest.spyOn(redux, "useSelector");
// spy.mockReturnValue({ username: "test" });

describe("Home Page", () => {
  it("should render homepage success", () => {
    renderWithMockedProvider(<Home />);
  });
});
