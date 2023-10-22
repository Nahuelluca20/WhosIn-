import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import AssistanceCard from "@/components/cards/assistance-card";
import {EventData} from "@/lib/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EventsDisplay from "@/components/layouts/events-display";

import {getEventsByUserId} from "../api/actions";

export default async function page() {
  const user: User | null = await currentUser();
  const events: EventData = await getEventsByUserId(user?.id as string);

  // const pastEvents: EventData = await events.data.filter()
  // const nextEvents: EventData = await events.data.filter()

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
          <EventsDisplay events={events} />
        </TabsContent>
        <TabsContent
          className="h-full flex-col border-none p-0 data-[state=active]:flex"
          value="past-events"
        >
          <h1>eventos pasado</h1>
          <EventsDisplay events={events} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
