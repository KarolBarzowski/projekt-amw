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
  padding: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  outline: none;

  :hover:not(:disabled) {
    background-color: ${({ theme }) => theme.gray4};
  }

  :disabled {
    cursor: default;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 21px;
`;

const StyledExpandIcon = styled(ExpandIcon)`
  fill: ${({ theme }) => theme.text};
  margin-right: -10px;
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

function DateSelect({
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo,
  isReadonly,
  dateText,
  setDateText,
  readonlyDate,
}) {
  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [readonlyDateText, setReadonlyDateText] = useState("");

  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  useEffect(() => {
    let fromDate, toDate;

    if (readonlyDate) [fromDate, toDate] = readonlyDate;
    if (dateFrom) fromDate = dateFrom;
    if (dateTo) toDate = dateTo;

    console.log(fromDate, toDate);

    const fromDay = fromDate.getDate();
    const fromMonth = monthsInYear[fromDate.getMonth()];
    const fromYear = fromDate.getFullYear();

    const toDay = toDate.getDate();
    const toMonth = monthsInYear[toDate.getMonth()];
    const toYear = toDate.getFullYear();

    const isSameMonth = fromMonth === toMonth && fromYear === toYear;

    const value = `${fromDay}${isSameMonth ? "" : ` ${fromMonth}`}${
      isSameMonth ? "" : fromYear === toYear ? "" : ` ${fromYear}`
    } - ${toDay} ${toMonth} ${toYear}`;

    setReadonlyDateText(value);
    setDateText(value);
  }, [readonlyDate, dateFrom, dateTo, setDateText]);

  return (
    <Wrapper ref={dropdownRef}>
      <DateButton
        type="button"
        onClick={() => setIsDropdownOpen((prevState) => !prevState)}
        disabled={isReadonly}
      >
        <StyledParagraph>
          {isReadonly ? readonlyDateText : dateText}
        </StyledParagraph>
        {!isReadonly ? <StyledExpandIcon isExpanded={isDropdownOpen} /> : null}
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
