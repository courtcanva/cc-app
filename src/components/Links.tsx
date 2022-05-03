// import Link from "next/link";
import React from "react";
import { Button, Stack } from "@chakra-ui/react";

export const Links = () => {
  return (
    <Stack direction="row" spacing={4} align="center">
      <Button>
        <a href="/?start=500">
          start from <strong>500</strong>
        </a>
      </Button>
      <Button>
        <a href="/?start=1000">
          start from <strong>1000</strong>
        </a>
      </Button>
    </Stack>
  );
};
