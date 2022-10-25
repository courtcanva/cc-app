import OrderItem from "@/components/OrderGeneration/OrderItem";
import renderWithMockedProvider from "../../utils";
import { screen } from "@testing-library/react";
import { mockCartData } from "@/components/MockData/MockCartData";

describe("Order Generation", () => {
  it("Should render all content properly", () => {
    renderWithMockedProvider(<OrderItem item={mockCartData[0]} index={0} />);

    const quotationTitle = screen.getByText("Qutation 1");
    const previewTitle = screen.getByText("Design Preview");
    const nameTitle = screen.getByText("Design Name");
    const detailTitle = screen.getByText("Details");
    const nameContent = screen.getByText("Small Court example");

    expect(quotationTitle).toBeInTheDocument();
    expect(previewTitle).toBeInTheDocument();
    expect(nameTitle).toBeInTheDocument();
    expect(detailTitle).toBeInTheDocument();
    expect(nameContent).toBeInTheDocument();
  });
});
