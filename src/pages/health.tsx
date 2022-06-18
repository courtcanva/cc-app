import { Flex, Button } from "@chakra-ui/react";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/axios";
import { useStoreDispatch } from "../store/hooks";

const healthCheck = createAsyncThunk("Health Check", async () => {
  api(process.env.NEXT_PUBLIC_HEALTH_API as string, { method: "get" })
    .then((response) => {
      return alert("Connect to BD and Service is " + response.data.status);
    })
    .catch((error) => alert("Connection failed"));
});

export default function Health() {
  const dispatch = useStoreDispatch();
  return (
    <Flex direction="column" justify="center" align="center" h="calc(100vh - 72px)">
      <Button
        mt="1rem"
        pl="2.5rem"
        pr="2.5rem"
        variant="shareBtn"
        onClick={() => dispatch(healthCheck())}
      >
        Health Check
      </Button>
    </Flex>
  );
}
