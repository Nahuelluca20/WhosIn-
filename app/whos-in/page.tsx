import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import {EventData} from "@/lib/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EventsDisplay from "@/components/layouts/events-display";

import {getEventsByUserId} from "../api/actions";

export default async function page() {
  const user: User | null = await currentUser();
  const events: EventData = await getEventsByUserId(user?.id as string);
  const currentDate = new Date();

  const pastEvents = (events.data ?? []).filter(
    (event) => new Date(event.data?.event_date as string) < currentDate,
  );

  const nextEvents = (events.data ?? []).filter(
    (event) => new Date(event.data?.event_date as string) > currentDate,
  );

  return (
    <main className="px-4 grid gap-y-5 justify-center w-full">
      <Tabs className="h-full space-y-6" defaultValue="next-events">
        <TabsList>
          <TabsTrigger className="relative" value="next-events">
            Eventos próximos
          </TabsTrigger>
          <TabsTrigger value="past-events">Eventos Pasados</TabsTrigger>
        </TabsList>
        <TabsContent
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
          value="next-events"
        >
          {nextEvents.length > 0 && <EventsDisplay events={nextEvents} />}
        </TabsContent>
        <TabsContent
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
          value="past-events"
        >
          {pastEvents.length > 0 && <EventsDisplay events={pastEvents} />}
        </TabsContent>
      </Tabs>
    </main>
  );
}
