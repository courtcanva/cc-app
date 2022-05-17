import type { NextPage } from "next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  clear,
  incrementByAmount,
  changeCounter,
} from "../store/reducer/counterSlice";
import HeaderLayout from "../layouts/HeaderLayout";
import EditorSideBar from "@/components/EditorSideBar";
import { Button, Box, Flex, Heading, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
  const count = useSelector(changeCounter);
  const dispatch = useDispatch();
  return (
    <HeaderLayout>
      <Flex align="center" justify="center" flexDirection="column">
        <Heading mt="24px" mb={4}>
          Welcome to CourtCanva
        </Heading>
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
      </Flex>
      <EditorSideBar />
    </HeaderLayout>
  );
};

// TODO sample
const CountWrapper = styled.span`
  color: orange;
`;

export default Home;
