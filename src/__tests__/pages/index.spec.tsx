import { render } from "@testing-library/react";
import Home from "src/pages";
import { StoreProvider } from '../../stores'

describe("Home", () => {
  it("renders homepage", () => {
    const { container } = render(<StoreProvider><Home /></StoreProvider>);
    expect(container).toMatchSnapshot();
  });
});
