import { enableStaticRendering } from "mobx-react-lite";
import React, { createContext, ReactNode, useContext } from "react";
import { RootStore, RootStoreHydration } from "./RootStore";

const IS_SSR = typeof window === "undefined";
enableStaticRendering(IS_SSR);

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
// StoreContext.displayName = "StoreContext";

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}

export function useCounterStore() {
  const { counterStore } = useStore();
  return counterStore;
}

export function useSizeSwitcherStore() {
  const { sizeSwitcherStore } = useStore();
  return sizeSwitcherStore;
}

export function StoreProvider({
  children,
  hydrationData,
}: {
  children: ReactNode;
  hydrationData?: RootStoreHydration;
}) {
  const store = initializeStore(hydrationData);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

function initializeStore(initialData?: RootStoreHydration): RootStore {
  const _store = store ?? new RootStore();

  if (initialData) {
    _store.hydrate(initialData);
  }
  // For SSG and SSR always create a new store
  if (IS_SSR) return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}
