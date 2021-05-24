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

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;

  ${Day} {
    margin: 5px;
  }
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
  const [isTodayActive, setIsTodayActive] = useState(false);
  const [isThisWeekActive, setIsThisWeekActive] = useState(false);
  const [isThisMonthActive, setIsThisMonthActive] = useState(false);
  const [isLast3MonthsActive, setIsLast3MonthsActive] = useState(false);
  const [isThisYearActive, setIsThisYearActive] = useState(false);
  const [isAllTimeActive, setIsAllTimeActive] = useState(false);

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

  useEffect(() => {
    const dateFromTs = dateFrom.setHours(0, 0, 0, 0);
    const dateToTs = dateTo.setHours(0, 0, 0, 0);

    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).setHours(0, 0, 0, 0);
    const lastWeek = new Date(today - 6 * 24 * 60 * 60 * 1000).getTime();
    const lastMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    ).getTime();
    const last3Months = new Date();
    last3Months.setDate(1);
    last3Months.setMonth(last3Months.getMonth() - 2);
    last3Months.setHours(0, 0, 0, 0);
    const lastYear = new Date(new Date().getFullYear(), 0, 1).setHours(
      0,
      0,
      0,
      0
    );
    const allTime = new Date(2020, 2, 1).setHours(0, 0, 0, 0);

    setIsTodayActive(dateFromTs === yesterday && dateToTs === today);
    setIsThisWeekActive(dateFromTs === lastWeek && dateToTs === today);
    setIsThisMonthActive(dateFromTs === lastMonth && dateToTs === today);
    setIsLast3MonthsActive(
      dateFromTs === last3Months.getTime() && dateToTs === today
    );
    setIsThisYearActive(dateFromTs === lastYear && dateToTs === today);
    setIsAllTimeActive(dateFromTs === allTime && dateToTs === today);
  }, [dateTo, dateFrom]);

  const handleSetDate = (key) => {
    const today = new Date();

    switch (key) {
      case "Today":
        const yesterday = new Date(
          new Date().setDate(new Date().getDate() - 1)
        );
        setDateFrom(yesterday);
        setDateTo(today);
        break;
      case "This week":
        const lastWeek = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
        setDateFrom(lastWeek);
        setDateTo(today);
        break;
      case "This month":
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        setDateFrom(lastMonth);
        setDateTo(today);
        break;
      case "Last 3 months":
        const d = new Date();
        d.setDate(1);
        d.setMonth(d.getMonth() - 2);
        setDateFrom(d);
        setDateTo(today);
        break;
      case "This year":
        const lastYear = new Date(today.getFullYear(), 0, 1);
        setDateFrom(lastYear);
        setDateTo(today);
        break;
      case "All time":
        const allTime = new Date(2020, 2, 1);
        setDateFrom(allTime);
        setDateTo(today);
        break;
      default:
        break;
    }
  };

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
      <StyledInfo secondary>
        Use both mouse buttons to specify date
        <br />
        Or try these
      </StyledInfo>
      <Buttons>
        <Day
          type="button"
          selected={isTodayActive}
          onClick={() => handleSetDate("Today")}
        >
          Today
        </Day>
        <Day
          type="button"
          selected={isThisWeekActive}
          onClick={() => handleSetDate("This week")}
        >
          Last 7 days
        </Day>
        <Day
          type="button"
          selected={isThisMonthActive}
          onClick={() => handleSetDate("This month")}
        >
          This month
        </Day>
        <Day
          type="button"
          selected={isLast3MonthsActive}
          onClick={() => handleSetDate("Last 3 months")}
        >
          Last 3 months
        </Day>
        <Day
          type="button"
          selected={isThisYearActive}
          onClick={() => handleSetDate("This year")}
        >
          This year
        </Day>
        <Day
          type="button"
          selected={isAllTimeActive}
          onClick={() => handleSetDate("All time")}
        >
          All time
        </Day>
      </Buttons>
    </Container>
  );
}

export default Calendar;
