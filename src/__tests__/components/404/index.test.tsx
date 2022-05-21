import { render, screen } from "@testing-library/react";
import Custom404 from "../../../pages/404";

test("button in the 404 page needs to display the correct text", () => {
  render(<Custom404 />);

  const homeButtonElement = screen.getByRole("button");

  expect(homeButtonElement).toBeInTheDocument();
}); 