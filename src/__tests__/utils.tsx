import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import store from "../store";
import { render } from "@testing-library/react";

const renderWithMockedProvider = (children: ReactNode) => {
  return render(<Provider store={store}>{children}</Provider>);
};

export default renderWithMockedProvider;
