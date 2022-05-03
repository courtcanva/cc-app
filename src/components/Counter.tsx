import { observer } from "mobx-react-lite";
import React from "react";
import { useCounterStore } from "../stores";
import { Text } from "@chakra-ui/react";

export const Counter = observer(function Counter() {
  const store = useCounterStore();

  return <Text fontSize={store.size === "BIG" ? "5xl" : "lg"}>{store.counter}</Text>;
});
