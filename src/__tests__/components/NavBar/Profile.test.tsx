import { screen } from "@testing-library/react";
import Profile from "@/components/NavBar/Profile";
import renderWithMockedProvider from "../../utils";

describe("Profile", () => {
  const props = {
    isOpen: true,
    onOpen: jest.fn(),
    onClose: jest.fn(),
    handleLogout: jest.fn(),
  };
  it("should render text correctly", () => {
    renderWithMockedProvider(
      <Profile
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpen={props.onOpen}
        handleLogout={props.handleLogout}
      />
    );
    const MyAccountElement = screen.getByText("My Account");
    const MyTemplateElement = screen.getByText("My Template");
    const MyOrderElement = screen.getByText("My Order");
    const SignOutElement = screen.getByText("Sign Out");

    expect(MyAccountElement).toBeInTheDocument();
    expect(MyTemplateElement).toBeInTheDocument();
    expect(MyOrderElement).toBeInTheDocument();
    expect(SignOutElement).toBeInTheDocument();
  });
});
