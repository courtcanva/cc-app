import renderWithMockedProvider from "../../utils";
import MyAccountContainer from "@/components/MyAccount/MyAccountContainer";
import FlexContainer from "@/components/MyAccount/FlexContainer";
import { screen } from "@testing-library/react";
import { Box, Button, Text } from "@chakra-ui/react";
import Image from "next/image";

describe("My account", () => {
  it("Should render all page titles and return to design button", () => {
    renderWithMockedProvider(<MyAccountContainer />);
    const pageTitle = screen.getByText("My Account");
    const avatarTitle = screen.getByText("Avatar");
    const nameTitle = screen.getByText("Name");
    const emailTitle = screen.getByText("Email Address");
    const passwordTitle = screen.getByText("Password");
    const returnBtn = screen.getByRole("button", { name: "Return to Design" });

    expect(pageTitle).toBeVisible();
    expect(avatarTitle).toBeVisible();
    expect(nameTitle).toBeVisible();
    expect(emailTitle).toBeVisible();
    expect(passwordTitle).toBeVisible();
    expect(returnBtn).toBeVisible();
  });

  it("Should render user data of avatar", async () => {
    const avatarUrl =
      "https://courtcanva-image-node.s3.ap-southeast-2.amazonaws.com/preview-image/-1XoxUAeBOR6_wZaPAB83.png";
    renderWithMockedProvider(
      <FlexContainer
        title="Name"
        content={<Box>{avatarUrl && <Image src={avatarUrl} layout="fill" />}</Box>}
      />
    );
    const nameData = screen.getByRole("img");
    expect(nameData).toBeVisible();
  });

  it("Should render user data of name", async () => {
    renderWithMockedProvider(<FlexContainer title="Name" content={<Text>User Name</Text>} />);
    const nameData = screen.getByText("User Name");
    expect(nameData).toBeVisible();
  });

  it("Should render user data of email", async () => {
    renderWithMockedProvider(
      <FlexContainer title="Email Address" content={<Text>user123@gmail.com</Text>} />
    );
    const emailData = screen.getByText("user123@gmail.com");
    expect(emailData).toBeVisible();
  });

  it("Should render user data of password", async () => {
    renderWithMockedProvider(
      <FlexContainer title="Password" content={<Button>Change Password</Button>} />
    );
    const passwordData = screen.getByRole("button", { name: "Change Password" });
    expect(passwordData).toBeVisible();
  });
});
