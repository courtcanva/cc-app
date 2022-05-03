import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useCounterStore, useSizeSwitcherStore } from "../stores";
import { Button } from "@chakra-ui/react";

export const SizeControls = observer(function SizeControls() {
  const switchStore = useSizeSwitcherStore();
  const stopwatchStore = useCounterStore();

  const switchToBig = useCallback(() => {
    return switchStore.makeStopwatchBig();
  }, [switchStore]);

  const switchToSmall = useCallback(() => {
    return switchStore.makeStopwatchSmall();
  }, [switchStore]);

  return (
    <div className="buttons-wrap">
      <Button isDisabled={stopwatchStore.size === "BIG"} onClick={switchToBig}>
        Big
      </Button>
      <Button isDisabled={stopwatchStore.size === "SMALL"} onClick={switchToSmall}>
        Small
      </Button>
    </div>
  );
});
