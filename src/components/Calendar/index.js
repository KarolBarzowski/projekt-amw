import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Paragraph from "components/Paragraph";
import { ReactComponent as ArrowIcon } from "assets/expand.svg";

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 300px;
  border-radius: 5px;
  padding: 10px;
`;

const CurrentDate = styled(Paragraph)`
  font-size: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  outline: none;
  font-family: "Poppins", sans-serif;
  background-color: transparent;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.gray4};
  padding: 2px 4px;
  transition: background-color 0.05s ease-in-out, border 0.05s ease-in-out;
`;

const Day = styled.button`
  font-size: 16px;
  color: ${({ theme, isToday, selected }) =>
    isToday && !selected ? theme.blue : theme.text};
  outline: none;
  font-family: "Poppins", sans-serif;
  background-color: ${({ theme, selected, included, empty }) =>
    selected || (included && !empty) ? theme.blue : "transparent"};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, isToday }) => (isToday ? theme.blue : theme.gray4)};
  padding: 2px 4px;
  transition: background-color 0.05s ease-in-out;

  :hover:not(:disabled) {
    background-color: ${({ theme, selected, included }) =>
      selected || included ? theme.blue : theme.gray4};
    cursor: pointer;
  }

  :disabled {
    color: ${({ theme }) => theme.disabled};
  }
`;

const DayPlaceholder = styled.span`
  font-size: ${({ theme }) => theme.body};
  color: ${({ theme, red }) =>
    red ? "rgba(255, 69, 58, .6)" : theme.textSecondary};
  font-family: "Poppins", sans-serif;
  padding: 2px 4px;
`;

const DaysWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-column-gap: 2px;
  grid-row-gap: 2px;
  margin: 10px 0 0;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  fill: ${({ theme }) => theme.text};
  transform: rotate(${({ rotate }) => rotate}deg);
`;

const ButtonIcon = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;

  :disabled {
    cursor: default;

    ${StyledArrowIcon} {
      fill: ${({ theme }) => theme.disabled};
    }
  }
`;

const StyledInfo = styled(Paragraph)`
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1px;
  margin-top: 10px;
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

function Calendar({ dateFrom, dateTo, setDateFrom, setDateTo }) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isNextMonth, setIsNextMonth] = useState(false);
  const [isPrevMonth, setIsPrevMonth] = useState(true);

  useEffect(() => {
    let currentDateFrom = dateFrom.setHours(0, 0, 0, 0);
    let currentDateTo = dateTo.setHours(0, 0, 0, 0);

    const handleSelect = (e, day, type) => {
      e.preventDefault();
      const selectedDate = new Date(year, month, day, 0, 0, 0, 0);
      const selectedDateTs = selectedDate.getTime();

      if (type === "l") {
        if (selectedDateTs < currentDateTo) setDateFrom(selectedDate);
      } else if (selectedDateTs > currentDateFrom) setDateTo(selectedDate);
    };

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = new Date(year, month, 1).getDay();
    const today = new Date();
    const isCurrentMonth =
      year === today.getFullYear() && month === today.getMonth();

    if (daysInMonth < day) setDay(1);

    const arr = [];
    for (let i = 1; i <= daysInMonth + startDay - 1; i += 1) {
      let disabled = isCurrentMonth && i - startDay + 1 > today.getDate();
      let currentDate = new Date(
        year,
        month,
        i - startDay + 1,
        0,
        0,
        0,
        0
      ).getTime();

      arr.push(
        <Day
          type="button"
          key={i}
          empty={startDay > i}
          disabled={startDay > i || disabled}
          isToday={isCurrentMonth && today.getDate() === i - startDay + 1}
          selected={
            currentDate === currentDateFrom || currentDate === currentDateTo
          }
          included={
            currentDate >= currentDateFrom && currentDate <= currentDateTo
          }
          onClick={(e) => handleSelect(e, i - startDay + 1, "l")}
          onContextMenu={(e) => handleSelect(e, i - startDay + 1, "r")}
        >
          {startDay <= i ? i - startDay + 1 : null}
        </Day>
      );
    }

    setDays(arr);
    setIsNextMonth(!isCurrentMonth);
    if (month === 2 && year === 2020) {
      setIsPrevMonth(false);
    } else setIsPrevMonth(true);
    // eslint-disable-next-line
  }, [day, month, year, dateFrom, dateTo]);

  const handleMonthDown = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const handleMonthUp = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  return (
    <Container>
      <Row>
        <ButtonIcon
          type="button"
          onClick={handleMonthDown}
          disabled={!isPrevMonth}
        >
          <StyledArrowIcon rotate={90} />
        </ButtonIcon>
        <CurrentDate>
          {monthsInYear[month]} {year}
        </CurrentDate>
        <ButtonIcon
          type="button"
          onClick={handleMonthUp}
          disabled={!isNextMonth}
        >
          <StyledArrowIcon rotate={270} />
        </ButtonIcon>
      </Row>
      <DaysWrapper>
        <DayPlaceholder>Mon</DayPlaceholder>
        <DayPlaceholder>Tue</DayPlaceholder>
        <DayPlaceholder>Wed</DayPlaceholder>
        <DayPlaceholder>Thu</DayPlaceholder>
        <DayPlaceholder>Fri</DayPlaceholder>
        <DayPlaceholder>Sat</DayPlaceholder>
        <DayPlaceholder red>Sun</DayPlaceholder>
        {days}
      </DaysWrapper>
      <StyledInfo secondary>Use both mouse buttons to specify date</StyledInfo>
    </Container>
  );
}

export default Calendar;
