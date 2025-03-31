import dayjs from "dayjs";

export function formatDate(dateString: string) {
  return dayjs(dateString).format("MMMM D, YYYY, h:mm A");
}
