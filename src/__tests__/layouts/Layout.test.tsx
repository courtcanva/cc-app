import Layout from "../../layouts";
import { screen, render } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import renderWithMockedProvider, { createMockRouter } from "../utils";

describe("Header", () => {
  it("should render the Layout", () => {
    render(
      <RouterContext.Provider value={createMockRouter({ pathname: "/404" })}>
        <Layout> </Layout>
      </RouterContext.Provider>
    );
    const navBarBtn = screen.getByRole("button", { name: /Share/i });
    expect(navBarBtn).toBeInTheDocument();
    const budgetTextElement = screen.queryAllByText(/Estimated Budget:/i);
    expect(budgetTextElement).toHaveLength(0);
  });

  it("should render full layout", () => {
    renderWithMockedProvider(
      <RouterContext.Provider value={createMockRouter({})}>
        <Layout> </Layout>
      </RouterContext.Provider>
    );
    const budgetTextElement = screen.queryAllByText(/Estimated Budget:/i);
    expect(budgetTextElement).toHaveLength(1);
  });

  it("should define Layout", () => {
    expect(Layout).toBeDefined();
  });
});
