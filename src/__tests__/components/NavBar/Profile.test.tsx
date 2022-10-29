import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("should call onOpen when hover the menuButton and call onClose when unhover the menuButton", () => {
    renderWithMockedProvider(
      <Profile
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpen={props.onOpen}
        handleLogout={props.handleLogout}
      />
    );
    const buttonElement = screen.getByRole("button", { name: "User information" });
    userEvent.hover(buttonElement);
    expect(props.onOpen).toHaveBeenCalledTimes(1);
  });
  it("should call onClose when unhover the menuButton", () => {
    renderWithMockedProvider(
      <Profile
        isOpen={props.isOpen}
        onClose={props.onClose}
        onOpen={props.onOpen}
        handleLogout={props.handleLogout}
      />
    );
    const buttonElement = screen.getByRole("button", { name: "User information" });
    userEvent.unhover(buttonElement);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });
});
