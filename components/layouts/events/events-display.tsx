import {EventObject} from "@/lib/types";

import AssistanceCard from "../../cards/assistance-card";

export default function EventsDisplay({events}: {events: EventObject[]}) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start sm:justify-start gap-4 w-full max-w-[1440px]">
      {events &&
        events.map((event) => (
          <AssistanceCard
            key={event.ref.id}
            attend={String(event.data?.users_attend?.length) ?? "0"}
            eventId={event.ref.id}
            eventTitle={event.data?.event_title ?? ""}
            totalGuests={event.data?.total_guests ?? ""}
            unconfirmed={
              String(
                Number(event.data?.total_guests) -
                  Number(event.data ? event.data?.users_attend?.length : 0),
              ) ?? ""
            }
          />
        ))}
    </div>
  );
}
