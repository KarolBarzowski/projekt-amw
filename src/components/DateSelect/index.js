import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Calendar from "components/Calendar";
import Paragraph from "components/Paragraph";
import { ReactComponent as ExpandIcon } from "assets/expand.svg";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const Wrapper = styled.div`
  position: relative;
`;

const DateButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 40px;
  border: none;
  background-color: ${({ theme }) => theme.gray5};
  padding: 0 0 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  outline: none;

  :hover {
    background-color: ${({ theme }) => theme.gray4};
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 21px;
`;

const StyledExpandIcon = styled(ExpandIcon)`
  fill: ${({ theme }) => theme.text};
  transform: ${({ isExpanded }) =>
    isExpanded ? "rotate(-180deg)" : "rotate(0)"};
  transition: transform 0.15s ease-in-out, fill 0.15s ease-in-out;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.gray5};
  border-radius: 8px;
  overflow-y: auto;
  opacity: 0;
  transition: background-color 0.15s ease-in-out;

  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
          display: block;
        `
      : css`
          visibility: hidden;
          display: none;
        `};
`;

const monthsInYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function DateSelect({ dateFrom, dateTo, setDateFrom, setDateTo }) {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    console.log("update", dateFrom, dateTo);
    const dF = dateFrom.getDate();
    const mF = monthsInYear[dateFrom.getMonth()];
    const yF = dateFrom.getFullYear();

    const dT = dateTo.getDate();
    const mT = monthsInYear[dateTo.getMonth()];
    const yT = dateTo.getFullYear();

    setDisplayText(`${dF} ${mF} ${yF} - ${dT} ${mT} ${yT}`);
  }, [dateFrom, dateTo]);

  return (
    <Wrapper ref={dropdownRef}>
      <DateButton
        type="button"
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
      >
        <StyledParagraph>{displayText}</StyledParagraph>
        <StyledExpandIcon isExpanded={isDropdownOpen} />
      </DateButton>
      <Dropdown isOpen={isDropdownOpen}>
        <Calendar
          dateFrom={dateFrom}
          dateTo={dateTo}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
        />
      </Dropdown>
    </Wrapper>
  );
}

export default DateSelect;
