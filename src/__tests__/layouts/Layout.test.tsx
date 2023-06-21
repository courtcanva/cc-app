import Layout from "../../layouts";
import { screen, render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import renderWithMockedProvider, { createMockRouter } from "../utils";
import { GoogleOAuthProvider } from "@react-oauth/google";

describe("Header", () => {
  it("should render the Layout", () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <RouterContext.Provider value={createMockRouter({ pathname: "/404" })}>
          <Layout> </Layout>
        </RouterContext.Provider>
      </GoogleOAuthProvider>
    );
    const navBarBtn = screen.getByRole("button", { name: /Share/i });
    expect(navBarBtn).toBeInTheDocument();
    const budgetTextElement = screen.queryAllByText(/Estimated Budget/i);
    expect(budgetTextElement).toHaveLength(0);
  });

  it("should render full layout", () => {
    renderWithMockedProvider(
      <GoogleOAuthProvider clientId="testid">
        <RouterContext.Provider value={createMockRouter({})}>
          <Layout> </Layout>
        </RouterContext.Provider>
      </GoogleOAuthProvider>
    );
    const quotationTextElement = screen.queryAllByText(/Quotation/i);
    const depositTextElement = screen.queryAllByText(/Deposit/i);
    expect(quotationTextElement).toHaveLength(3);
    expect(depositTextElement).toHaveLength(2);
  });

  it("should define Layout", () => {
    expect(Layout).toBeDefined();
  });
});
