"use client";

import {Calendar} from "./ui/calendar";

export default function CalendarClient({day}: {day: string}) {
  const date = new Date(day);

  return (
    <Calendar className="rounded-md border" defaultMonth={date} mode="single" selected={date} />
  );
}
