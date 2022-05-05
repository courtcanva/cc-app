import { render } from "@testing-library/react";
import Header from "../../layouts/Header";

describe("Header", () => {
  it("shoud render header success", () => {
    render(<Header />);
  });
});
