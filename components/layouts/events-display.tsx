import {EventData} from "@/lib/types";

import AssistanceCard from "../cards/assistance-card";

export default function EventsDisplay({events}: {events: EventData}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
      {events.data &&
        events.data.map((event) => (
          <AssistanceCard
            key={event.ref.id}
            attend={event.data?.attend ?? ""}
            eventId={event.ref.id}
            eventTitle={event.data?.event_title ?? ""}
            totalGuests={event.data?.total_guests ?? ""}
            unconfirmed={event.data?.unconfirmed ?? ""}
          />
        ))}
    </div>
  );
}
