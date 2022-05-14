import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: white;
  color: black;
  // border: 2px solid pink;
  position: relative;
`;

export const WrapperOuter = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  // border: 1px solid purple;
  padding: 0.7em 0;
`;
export const TextWrapper = styled.div`
  // border: 1px solid green;
  width: 50%;
  padding: 0.2em 0 0.2em 0.7em;
`;

export const Text = styled.span`
  // border: 1px solid red;
  font-size: 1em;
  margin-left: 1em;
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
  // border: 1px solid red;
  font-size: 1em;
  text-align: right;
`;
export const BoldText = styled(PriceText)`
  font-weight: 700;
  font-size: 1.5em;
`;
export const LightText = styled(PriceText)`
  color: grey;
  font-size: 0.8em;
  &:before {
    content: "*";
    color: red;
    margin-right: 0.2em;
  }
`;

export const OpenCloseButton = styled.button``;
