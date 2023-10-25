"use client";

import {Calendar} from "./ui/calendar";

export default function CalendarClient({day}: {day: Date}) {
  return <Calendar className="rounded-md border" mode="single" selected={day} />;
}
