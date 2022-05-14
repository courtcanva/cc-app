import styled from "styled-components";
import { PageItemWrapper as FooterItemWrapper } from "../helpers/ItemWrapper";
import { PageText as FooterText } from "../helpers/PageText";

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: black;
  background-color: white;
  padding: 0.5em;
  width: 100%;
  font-size: 1.1em;
  border-top: 1px solid black;
`;
export const Wrapper = styled(FooterItemWrapper)`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;

export const Text = styled(FooterText)`
  color: black;
  font-size: 1em;

  cursor: pointer;
`;
