import React from "react";
import styled from "styled-components";
import Paragraph from "components/Paragraph";
import { ReactComponent as TrendingUpIcon } from "assets/trending_up.svg";
import { ReactComponent as TrendingFlatIcon } from "assets/trending_flat.svg";
import { ReactComponent as TrendingDownIcon } from "assets/trending_down.svg";

const Wrapper = styled.button`
  display: flex;
  flex-flow: column nowrap;
  width: 233px;
  background-color: transparent;
  padding: 13px;
  outline: none;
  cursor: pointer;
  border-radius: 13px;
  border: 2px solid
    ${({ theme, active }) => (active ? theme.blue : theme.gray4)};
  margin: 10px;
  transition: border 0.15s ease-in-out, background-color 0.15s ease-in-out;

  :hover {
    background-color: ${({ theme }) => theme.gray5};
  }
`;

const ValueParagraph = styled(Paragraph)`
  font-size: 40px;
  margin: 5px 0 0;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

const DifferenceParagraph = styled(Paragraph)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  font-size: 21px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
`;

const StyledTrendingUpIcon = styled(TrendingUpIcon)`
  fill: ${({ theme }) => theme.green};
  margin-right: 5px;
`;

const StyledTrendingDownIcon = styled(TrendingDownIcon)`
  fill: ${({ theme }) => theme.red};
  margin-right: 5px;
`;

const StyledTrendingFlatIcon = styled(TrendingFlatIcon)`
  fill: ${({ theme }) => theme.yellow};
  margin-right: 5px;
`;

const BoxButton = ({ text, value, active, handleSelect, difference }) => (
  <Wrapper type="button" active={active} onClick={handleSelect}>
    <Paragraph secondary>{text}</Paragraph>
    <ValueParagraph>{value}</ValueParagraph>
    <DifferenceParagraph secondary>
      {difference === 0 ? <StyledTrendingFlatIcon /> : null}
      {difference > 0 ? <StyledTrendingUpIcon /> : null}
      {difference < 0 ? <StyledTrendingDownIcon /> : null}
      {difference > 0 ? "+" : null}
      {difference}
    </DifferenceParagraph>
  </Wrapper>
);

export default BoxButton;
