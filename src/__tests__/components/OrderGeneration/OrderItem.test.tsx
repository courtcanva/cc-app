import OrderItem from "@/components/OrderGeneration/OrderItem";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";

describe("Order Generation", () => {
  it("Should render all content properly", () => {
    renderWithMockedProvider(<OrderItem item={mockCartData[0]} index={0} depositRatio={0.02} />);

    const quotationTitle = screen.getByText("Quotation 1");
    const previewTitle = screen.getByText("Design Preview");
    const nameTitle = screen.getByText("Design Name");
    const quotationElement = screen.getByText("Quotation");
    const depositElement = screen.getByText("Deposit");
    const detailTitle = screen.getByText("Details");
    const nameContent = screen.getByText("Small Court example");

    expect(quotationTitle).toBeInTheDocument();
    expect(previewTitle).toBeInTheDocument();
    expect(nameTitle).toBeInTheDocument();
    expect(detailTitle).toBeInTheDocument();
    expect(nameContent).toBeInTheDocument();
    expect(quotationElement).toBeInTheDocument();
    expect(depositElement).toBeInTheDocument();
  });
});
