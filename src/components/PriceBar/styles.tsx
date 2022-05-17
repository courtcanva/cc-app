import styled from "styled-components";
import { PageItemWrapper as FooterItemWrapper } from "../helpers/ItemWrapper";

export const Container = styled.div`
  background-color: white;
  color: black;
  position: relative;
  margin-left: 98px;
  margin-top: 30px;
  box-shadow: 2px 2px 8px lightgrey;
`;

export const WrapperOuter = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 0.7em 0;

  @media only screen and (max-width: 1220px) {
    width: 35%;
  }

  @media only screen and (max-width: 1181px) {
    width: 40%;
  }

  @media only screen and (max-width: 872px) {
    width: 50%;
  }
`;
export const TextWrapper = styled.div`
  width: 50%;
  padding: 0.2em 0 0.2em 0.7em;
`;

export const Text = styled.span`
  font-size: 1em;
  margin-left: 1em;

  @media only screen and (max-width: 1180px) {
    font-size: 0.9em;
  }

  @media only screen and (max-width: 872px) {
    font-size: 0.8em;
  }
`;

export const ColorText = styled(Text)`
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    display: inline-block;
    background-color: pink;
    margin-right: 0.5em;
  }
`;

export const PriceWrapper = styled.div`
  position: absolute;
  bottom: 0.5em;
  right: 1em;
`;
export const PriceText = styled.p`
  font-size: 1em;
  text-align: right;
`;
export const BoldText = styled(PriceText)`
  font-weight: 700;
  font-size: 1.5em;

  @media only screen and (max-width: 1180px) {
    font-size: 1.2em;
  }

  @media only screen and (max-width: 872px) {
    font-size: 1em;
  }
`;
export const LightText = styled(PriceText)`
  color: grey;
  font-size: 0.8em;
  &:before {
    content: "*";
    color: red;
    margin-right: 0.2em;
  }

  @media only screen and (max-width: 1180px) {
    font-size: 0.6em;
  }

  @media only screen and (max-width: 872px) {
    font-size: 0.5em;
  }
`;

export const ContainerFooter = styled.div`
  bottom: 0;
  display: flex;
  justify-content: space-between;
  color: black;
  background-color: white;
  padding: 0.5em;
  font-size: 1.1em;
  margin-left: 98px;
`;
export const Wrapper = styled(FooterItemWrapper)`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
`;

export const OpenCloseButton = styled.div`
  color: lightgrey;
  position: absolute;
  padding-left: 22px;
  top: -15px;
  left: 43%;
  width: 60px;
  height: 15px;
  box-shadow: 1px 1px 10px lightgrey;
  -webkit-transform: perspective(50px) rotateX(20deg);
  z-index: -1;
`