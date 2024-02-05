import { setHours, setMinutes, format, addMinutes, isToday, isBefore, getHours, getMinutes } from "date-fns";

export function generateDayTimeList(date: Date): string[] {
  const now = new Date();
  const currentHour = getHours(now);
  const currentMinute = getMinutes(now);
  
  const startTime = setMinutes(setHours(date, 9), 0);
  const endTime = setMinutes(setHours(date, 21), 0);
  const interval = 45;
  const timeList: string[] = [];

  let currentTime = startTime;

  while (currentTime <= endTime) {
    const formattedTime = format(currentTime, "HH:mm");

    if (isToday(date) && (currentHour < getHours(currentTime) || (currentHour === getHours(currentTime) && currentMinute <= getMinutes(currentTime)))) {
      timeList.push(formattedTime);
    } else if (!isToday(date)) {
      timeList.push(formattedTime);
    }

    currentTime = addMinutes(currentTime, interval);
  }

  return timeList;
}
