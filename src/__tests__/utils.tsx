import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { render } from "@testing-library/react";
import { NextRouter } from "next/router";

const renderWithMockedProvider = (children: ReactNode) => {
  return render(<Provider store={store}>{children}</Provider>);
};

export function createMockRouter(router: Partial<NextRouter>): NextRouter {
  return {
    basePath: "",
    pathname: "/",
    route: "/",
    query: {},
    asPath: "/",
    back: jest.fn(),
    beforePopState: jest.fn(),
    prefetch: jest.fn(),
    push: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,
    ...router,
  };
}

export default renderWithMockedProvider;
