import Link from "next/link";

import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

export default function AssistanceCard({
  attend,
  eventTitle,
  unconfirmed,
  totalGuests,
  eventId,
}: {
  attend: string;
  eventTitle: string;
  unconfirmed: string;
  totalGuests: string;
  eventId: string;
}) {
  return (
    <Link href={`whos-in/${eventId}`}>
      <Card>
        <CardHeader className="flex w-[315px] sm:w-72 flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{eventTitle}</CardTitle>
          <span className="gap-1 flex items-center text-muted-foreground text-sm font-medium">
            {totalGuests}
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Asisten {attend}</div>
          <p className="text-xs text-muted-foreground">
            {`falt${unconfirmed === "1" ? "a" : "an"} ${unconfirmed} persona${
              unconfirmed === "1" ? "" : "s"
            } por confirmar`}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
