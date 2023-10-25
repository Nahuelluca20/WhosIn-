"use client";

import {Calendar} from "./ui/calendar";

export default function CalendarClient({day}: {day: string}) {
  // add 1 day to de day
  // console.log(day.setDate(day.getDate() + 1));
  const date = new Date(day);

  date.setDate(date.getDate() + 1);

  return (
    <Calendar className="rounded-md border" defaultMonth={date} mode="single" selected={date} />
  );
}
