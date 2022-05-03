import { observer } from "mobx-react-lite";
import React, { useCallback } from "react";
import { useStore } from "../stores";
import { Button } from "@chakra-ui/react";

export const CounterControls = observer(function CounterControls() {
  const { counterStore: stopwatchStore } = useStore();

  const pause = useCallback(() => {
    return stopwatchStore.pause();
  }, [stopwatchStore]);

  const resume = useCallback(() => {
    return stopwatchStore.resume();
  }, [stopwatchStore]);

  return (
    <div className="buttons-wrap">
      <Button
        isDisabled={stopwatchStore.state === "STOPPED" || stopwatchStore.state === "PAUSED"}
        onClick={pause}
      >
        PAUSE
      </Button>
      <Button disabled={stopwatchStore.state === "STARTED"} onClick={resume}>
        {stopwatchStore.state === "STOPPED" ? "START" : "RESUME"}
      </Button>
    </div>
  );
});
