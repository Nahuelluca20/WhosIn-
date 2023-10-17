import * as React from "react";

import {Calendar} from "@/components/ui/calendar";

export function CalendarDemo({date}: {date: Date | string}) {
  return (
    <div>
      <Calendar className="rounded-md border" mode="single" selected={date} />
    </div>
  );
}
