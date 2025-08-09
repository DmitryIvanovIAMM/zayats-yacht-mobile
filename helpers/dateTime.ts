export function getInternationalDateFormat(date: Date | string): string {
  const newDate = new Date(date);
  const year = newDate.getUTCFullYear();
  const month = months[newDate.getUTCMonth()];
  const day = newDate.getUTCDate();
  return `${month} ${day}, ${year}`;
}

export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getMonthName(monthNumber: number): string {
  return months[monthNumber] ?? "";
}
