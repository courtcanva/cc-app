import { render, screen } from "@testing-library/react";
import NavigationBar from "../../components/NavBar";

test("Each button in the navbar needs to display the correct text", () => {
  render(<NavigationBar />);

  const homeButtonElement = screen.getByTestId("home");
  const fileButtonElement = screen.getByTestId("file");
  const shareButtonElement = screen.getByTestId("share");

  expect(homeButtonElement).toBeInTheDocument();
  expect(fileButtonElement).toBeInTheDocument();
  expect(shareButtonElement).toBeInTheDocument();
  expect(homeButtonElement).toHaveTextContent("Home");
  expect(fileButtonElement).toHaveTextContent("File");
  expect(shareButtonElement).toHaveTextContent("Share");
});
