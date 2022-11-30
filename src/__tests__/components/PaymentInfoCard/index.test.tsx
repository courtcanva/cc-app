/* eslint-disable camelcase */
import {
  mockPaymentErrorPageData,
  mockPaymentFailurePageData,
  mockPaymentSuccessPageData,
} from "@/components/MockData/MockPaymentData";
import OrderInfoCard from "@/components/PaymentInfoCard";
import { render, screen } from "@testing-library/react";

describe("Payment Information Card", () => {
  it("should render success information", () => {
    const mockData = mockPaymentSuccessPageData;
    render(<OrderInfoCard paymentResPage={mockData} />);
    // test title
    const id = screen.getByText("Order ID");
    const status = screen.getByText("Status");
    const createdAt = screen.getByText("Created at");
    const paidAt = screen.getByText("Paid at");
    const deposit = screen.getByText("Deposit");
    // test content
    const content_id = screen.getByText("1145141919");
    const content_createdAt = screen.getByText("02/01/2022 11:11");
    const content_paidAt = screen.getByText("03/01/2022 11:11");
    const content_deposit = screen.getByText("A$2333.33");
    const content_status = screen.getByText("Paid");

    expect(id).toBeVisible();
    expect(status).toBeVisible();
    expect(createdAt).toBeVisible();
    expect(paidAt).toBeVisible();
    expect(deposit).toBeVisible();
    expect(content_id).toBeVisible();
    expect(content_createdAt).toBeVisible();
    expect(content_paidAt).toBeVisible();
    expect(content_deposit).toBeVisible();
    expect(content_status).toBeVisible();
  });

  it("should render failure information", () => {
    const mockData = mockPaymentFailurePageData;
    render(<OrderInfoCard paymentResPage={mockData} />);
    // test title
    const id = screen.getByText("Order ID");
    const status = screen.getByText("Status");
    const createdAt = screen.getByText("Created at");
    const deposit = screen.getByText("Deposit");
    // test content
    const content_id = screen.getByText("123456789");
    const content_createdAt = screen.getByText("01/01/2022 11:11");
    const content_deposit = screen.getByText("A$666.66");
    const content_status = screen.getByText("Unpaid");

    expect(id).toBeVisible();
    expect(status).toBeVisible();
    expect(createdAt).toBeVisible();
    expect(deposit).toBeVisible();
    expect(content_id).toBeVisible();
    expect(content_createdAt).toBeVisible();
    expect(content_deposit).toBeVisible();
    expect(content_status).toBeVisible();
  });

  it("should render nothing", () => {
    const mockData = mockPaymentErrorPageData;
    render(<OrderInfoCard paymentResPage={mockData} />);
    const id = screen.queryByText("Order ID");
    const status = screen.queryByText("Status");
    const createdAt = screen.queryByText("Created at");
    const paidAt = screen.queryByText("Paid at");
    const deposit = screen.queryByText("Deposit");
    expect(id).toBeNull();
    expect(status).toBeNull();
    expect(createdAt).toBeNull();
    expect(paidAt).toBeNull();
    expect(deposit).toBeNull();
  });
});
