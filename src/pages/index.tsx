import type { NextPage } from "next";
import styled from "styled-components";
import { useStoreDispatch, useStoreSelector } from "../store/hooks";
import {
  decrement,
  increment,
  clear,
  incrementByAmount,
  changeCounter,
  getTestData,
} from "../store/reducer/counterSlice";
import HeaderLayout from "../layouts/HeaderLayout";
import { Button, Box, Flex, Heading, Text } from "@chakra-ui/react";
import ChangeCourtSize from "@/components/ChangeCourtSize";

const Home: NextPage = () => {
  const count = useStoreSelector(changeCounter);
  const dispatch = useStoreDispatch();
  return (
    <HeaderLayout>
      <Flex align="center" justify="center" flexDirection="column">
        <Heading mt="24px" mb={4}>
          Welcome to CourtCanva
        </Heading>
        <ChangeCourtSize />
        <Button mt="24px" aria-label="Clear value" onClick={() => dispatch(clear())}>
          Clear
        </Button>
        <Box mt="12px" display="flex" flexDirection="row" alignItems="center">
          <Button aria-label="Increment value" onClick={() => dispatch(increment())}>
            Increment
          </Button>
          <CountWrapper>
            <Text m="8px" as="span" fontSize="6xl">
              {count}
            </Text>
          </CountWrapper>
          <Button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
            Decrement
          </Button>
        </Box>
        <Button
          mt="12px"
          mb="24px"
          aria-label="Clear value"
          onClick={() => dispatch(incrementByAmount(100))}
        >
          Plus 100
        </Button>
        <Button mt="12px" mb="24px" bg="teal" color="white" onClick={() => dispatch(getTestData())}>
          Check
        </Button>
      </Flex>
    </HeaderLayout>
  );
};

// TODO sample
const CountWrapper = styled.span`
  color: orange;
`;

export default Home;
