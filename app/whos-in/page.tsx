import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import AssistanceCard from "@/components/cards/assistance-card";
import {EventData} from "@/lib/types";

import {getEventsByUserId} from "../actions";

export default async function page() {
  const user: User | null = await currentUser();
  const events: EventData = await getEventsByUserId(user?.id as string);

  return (
    <main className="px-4 flex justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
        {events.data &&
          events.data.map((event) => (
            <AssistanceCard
              key={event.ts}
              attend={event.data?.attend ?? ""}
              eventTitle={event.data?.event_title ?? ""}
              totalGuests={event.data?.total_guests ?? ""}
              unconfirmed={event.data?.unconfirmed ?? ""}
            />
          ))}
      </div>
    </main>
  );
}
