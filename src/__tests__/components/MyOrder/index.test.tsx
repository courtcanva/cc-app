import mockOrdersData from "@/components/MockData/MockOrdersData";
import MyOrderContainer from "@/components/MyOrder";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";

describe("My Order Component", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.NEXT_PUBLIC_DESIGN_URL = "/";
  });
  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it("should render order list items correctly", () => {
    renderWithMockedProvider(<MyOrderContainer myOrders={mockOrdersData} />);
    const listOrderItems = screen.getAllByTestId("myOrderListItems");
    const ordersLength = mockOrdersData.length;
    expect(listOrderItems.length).toEqual(ordersLength);
  });

  it("should render order item title correctly", () => {
    renderWithMockedProvider(<MyOrderContainer myOrders={mockOrdersData} />);
    const orderIdElement = screen.getByText(/Order ID/i);
    const createdAtElement = screen.getByText(/Created At/i);
    const paidAtElement = screen.getByText(/Paid At/i);
    const statusElement = screen.getByText(/Status/i);
    const shoppingInformationElement = screen.getByText(/Shipping Information/i);
    const consigneeNameElement = screen.getByText(/Consignee Name/i);
    const consigneePhoneNoaElement = screen.getByText(/Consignee Phone No/i);
    const consigneeEmailElement = screen.getByText(/Consignee Email/i);
    const consigneeAddressElement = screen.getByText(/Consignee Address/i);
    const totalQuotationElement = screen.getByText(/Total Quotation/i);
    const totalDepositElement = screen.getByText(/Total Deposit/i);

    expect(orderIdElement).toBeInTheDocument();
    expect(createdAtElement).toBeInTheDocument();
    expect(paidAtElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(shoppingInformationElement).toBeInTheDocument();
    expect(consigneeNameElement).toBeInTheDocument();
    expect(consigneePhoneNoaElement).toBeInTheDocument();
    expect(consigneeEmailElement).toBeInTheDocument();
    expect(consigneeAddressElement).toBeInTheDocument();
    expect(totalQuotationElement).toBeInTheDocument();
    expect(totalDepositElement).toBeInTheDocument();
  });
});
