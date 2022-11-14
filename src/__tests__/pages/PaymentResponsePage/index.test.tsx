import {
  mockPaymentFailurePageData,
  mockPaymentSuccessPageData,
} from "@/components/MockData/MockPaymentData";
import PaymentResponse from "@/pages/payment";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("Payment Response Page", () => {
  it("should render payment success page", () => {
    const mockData = mockPaymentSuccessPageData;
    renderWithMockedProvider(<PaymentResponse paymentInfo={mockData} />);
    const title = screen.getByText("Payment Successful");
    const info1 = screen.getByText("Thank you!");
    const info2 = screen.getByText(
      "You have successfully paid the deposit. Our staff will contact you soon."
    );
    expect(title).toBeVisible();
    expect(info1).toBeVisible();
    expect(info2).toBeVisible();

    const checkOrderBtn = screen.getByRole("button", { name: /Check My Order/i });
    const repayBtn = screen.queryByRole("button", { name: /Try again/i });
    expect(checkOrderBtn).toBeInTheDocument();
    expect(repayBtn).not.toBeInTheDocument();
  });

  it("should render payment failure page", () => {
    const mockData = mockPaymentFailurePageData;
    renderWithMockedProvider(<PaymentResponse paymentInfo={mockData} />);
    const title = screen.getByText("Payment Failed");
    const info1 = screen.getByText("Something went wrong!");
    const info2 = screen.getByText("Your payment could not be processed. Please try again.");
    expect(title).toBeVisible();
    expect(info1).toBeVisible();
    expect(info2).toBeVisible();

    const checkOrderBtn = screen.getByRole("button", { name: /Check My Order/i });
    const repayBtn = screen.getByRole("button", { name: /Try again/i });
    expect(checkOrderBtn).toBeInTheDocument();
    expect(repayBtn).toBeInTheDocument();
  });
});
