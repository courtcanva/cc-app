import LoginModalContent from "@/components/Login";
import { render, screen } from "@testing-library/react";

describe("Login", () => {
  test("Each elements in the Login display the correct text", () => {
    render(<LoginModalContent isOpen={true} onClose={() => void {}} />);

    const logoEl = screen.getByRole("logo");
    const googleButtonEl = screen.getByRole("button", { name: /google/i });
    const emailButtonEl = screen.getByRole("button", { name: /email/i });

    expect(logoEl).toBeInTheDocument();
    expect(googleButtonEl).toBeInTheDocument();
    expect(emailButtonEl).toBeInTheDocument();
    expect(logoEl).toHaveTextContent("CourtCanva");
    expect(googleButtonEl).toHaveTextContent("Continue with Google");
    expect(emailButtonEl).toHaveTextContent("Continue with email");
  });
});
