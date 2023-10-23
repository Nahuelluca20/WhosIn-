import {currentUser} from "@clerk/nextjs";
import {User} from "@clerk/nextjs/server";

import {getFaunaUserId, getTeamsByUserId, getEventByTeam} from "@/app/api/actions";
import {EventData} from "@/lib/types";

import {Tabs, TabsList, TabsTrigger, TabsContent} from "../../ui/tabs";

import EventsDisplay from "./events-display";

export default async function EventTabs({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const user: User | null = await currentUser();
  const userId = await getFaunaUserId(user?.id as string);
  const teamsByUserId = await getTeamsByUserId(userId);

  console.log(teamsByUserId);

  const events: EventData = await getEventByTeam(searchParams.team as string);

  const currentDate = new Date();

  const pastEvents = (events.data ?? []).filter(
    (event) => new Date(event.data?.event_date as string) < currentDate,
  );

  const nextEvents = (events.data ?? []).filter(
    (event) => new Date(event.data?.event_date as string) > currentDate,
  );

  return (
    <Tabs className="h-full space-y-6" defaultValue="next-events">
      <TabsList>
        <TabsTrigger className="relative" value="next-events">
          Eventos próximos
        </TabsTrigger>
        <TabsTrigger value="past-events">Eventos Pasados</TabsTrigger>
      </TabsList>
      <TabsContent className="" value="next-events">
        {nextEvents.length > 0 ? (
          <EventsDisplay events={nextEvents} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
            <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">
              No hay eventos próximos
            </p>
          </div>
        )}
      </TabsContent>
      <TabsContent className="" value="past-events">
        {pastEvents.length > 0 ? (
          <EventsDisplay events={pastEvents} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
            <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">
              No hay eventos pasados
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
