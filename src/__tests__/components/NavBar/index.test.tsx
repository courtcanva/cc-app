import { render, screen } from "@testing-library/react";
import NavigationBar from "../../../components/NavBar";

test("Each button in the navbar needs to display the correct text", () => {
  render(<NavigationBar />);

  const homeButtonElement = screen.getByText(/Home/i);
  const fileButtonElement = screen.getByText(/File/i);
  const shareButtonElement = screen.getByText(/Share/i);

  expect(homeButtonElement).toBeInTheDocument();
  expect(fileButtonElement).toBeInTheDocument();
  expect(shareButtonElement).toBeInTheDocument();
  expect(homeButtonElement).toHaveTextContent("Home");
  expect(fileButtonElement).toHaveTextContent("File");
  expect(shareButtonElement).toHaveTextContent("Share");
});
