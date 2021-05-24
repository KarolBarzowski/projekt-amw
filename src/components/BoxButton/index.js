import React from "react";
import styled from "styled-components";
import Paragraph from "components/Paragraph";
import { ReactComponent as TrendingUpIcon } from "assets/trending_up.svg";
import { ReactComponent as TrendingFlatIcon } from "assets/trending_flat.svg";
import { ReactComponent as TrendingDownIcon } from "assets/trending_down.svg";

const Wrapper = styled.button`
  display: flex;
  flex-flow: column nowrap;
  min-width: 233px;
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
  fill: ${({ theme, reverse }) => (reverse ? theme.green : theme.red)};
  margin-right: 5px;
`;

const StyledTrendingDownIcon = styled(TrendingDownIcon)`
  fill: ${({ theme, reverse }) => (reverse ? theme.red : theme.green)};
  margin-right: 5px;
`;

const StyledTrendingFlatIcon = styled(TrendingFlatIcon)`
  fill: ${({ theme, reverse }) => (reverse ? theme.green : theme.red)};
  margin-right: 5px;
`;

const BoxButton = ({ text, value, active, handleSelect, difference }) => (
  <Wrapper type="button" active={active} onClick={handleSelect}>
    <Paragraph secondary>{text}</Paragraph>
    <ValueParagraph>
      {value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .trim()}
    </ValueParagraph>
    <DifferenceParagraph secondary>
      {difference === 0 ? (
        <StyledTrendingFlatIcon reverse={text === "Recovered"} />
      ) : null}
      {difference > 0 ? (
        <StyledTrendingUpIcon reverse={text === "Recovered"} />
      ) : null}
      {difference < 0 ? (
        <StyledTrendingDownIcon reverse={text === "Recovered"} />
      ) : null}
      {difference > 0 ? "+" : null}
      {difference
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        .trim()}
    </DifferenceParagraph>
  </Wrapper>
);

export default BoxButton;
