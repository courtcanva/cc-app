import { renderHook } from "@testing-library/react-hooks";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { configureStore, Store } from "@reduxjs/toolkit";
import strokeColorReducer from "@/store/reducer/strokeColorSlice";
import courtColorReducer from "@/store/reducer/courtColorSlice";
import useDispatchStrokeColor from "@/hooks/useDispatchStrokeColor";

const ReduxProvider = ({ children, reduxStore }: { children: ReactNode; reduxStore: Store }) => (
  <Provider store={reduxStore}>{children}</Provider>
);

it("should get the initialColor", () => {
  const store = configureStore({
    reducer: { strokeColor: strokeColorReducer, courtColor: courtColorReducer },
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
  );

  const { result } = renderHook(() => useDispatchStrokeColor()("keyArea"), { wrapper });
  expect(result.current.stroke).toBe("white");
});
