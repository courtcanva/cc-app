import { render, screen } from "@testing-library/react";
import MContent from "@/components/Login";

test("Each button in the Login needs to display the correct text", () => {
  render(<MContent />);

  const ContinueWithGoogleElement = screen.getByText(/Continue with Google/i);
  const ContinueWithEmailElement = screen.getByText(/Continue with Email/i);

  expect(ContinueWithGoogleElement).toBeInTheDocument();
  expect(ContinueWithEmailElement).toBeInTheDocument();
  expect(ContinueWithGoogleElement).toHaveTextContent("Continue with Google");
  expect(ContinueWithEmailElement).toHaveTextContent("Continue with Email");
});
