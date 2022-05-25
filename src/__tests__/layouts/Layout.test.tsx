import Layout from "../../layouts";
import { screen, render } from "@testing-library/react";
import Custom404 from "@/pages/404";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { createMockRouter } from "../../test-utils/createMockRouter";

describe("Header", () => {
  it("should render the navBar and 404", () => {
    render(
      <RouterContext.Provider value={createMockRouter({ pathname: "/404" })}>
        <Layout>
          <Custom404 />
        </Layout>
      </RouterContext.Provider>
    );
    const navBarBtn = screen.getByRole("button", { name: /Share/i });
    expect(navBarBtn).toBeInTheDocument();
    const budgetTextElement = screen.queryAllByText(/Estimated Budget:/i);
    expect(budgetTextElement).toHaveLength(0);
  });

  it("should render full layout", () => {
    render(
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
