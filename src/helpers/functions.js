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

export const makeReadableDate = (date) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = monthsInYear[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
