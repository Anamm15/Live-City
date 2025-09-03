export function formatToUSDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short", // Oct
    day: "numeric", // 1
    year: "numeric", // 2023
  }).format(date);
}
