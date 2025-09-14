export function formatDateRange(startDateStr: string, endDateStr: string) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  const options = { day: "numeric", month: "short" };
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const month = startDate.toLocaleString("en-US", { month: "short" });

  if (
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear()
  ) {
    return `${startDay}-${endDay} ${month}`;
  } else {
    const endMonth = endDate.toLocaleString("en-US", { month: "short" });
    return `${startDay} ${month} - ${endDay} ${endMonth}`;
  }
}

export function convertToReadable(checkInTimestamp: Date) {
  const checkInDate = new Date(checkInTimestamp);

  const readableDate = checkInDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return readableDate;
}
