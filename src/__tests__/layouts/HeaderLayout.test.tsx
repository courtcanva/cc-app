import renderWithMockedProvider from "../utils";
import HeaderLayout from "../../layouts/HeaderLayout";
import Home from "../../pages";

describe("Header", () => {
  it("shoud render layout success", () => {
    renderWithMockedProvider(
      <HeaderLayout title="Home">
        <Home />
      </HeaderLayout>
    );
  });
});
