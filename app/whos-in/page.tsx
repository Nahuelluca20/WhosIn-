import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import {EventData} from "@/lib/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EventsDisplay from "@/components/layouts/events/events-display";
import EventSwitcher from "@/components/navigation/event-switcher";

import {getFaunaUserId} from "../api/actions";
import {getEventByTeam} from "../api/events";
import {getTeamByMatchUserId} from "../api/teams";

function EmptyEvents({text}: {text: string}) {
  return (
    <div className="flex flex-wrap justify-center md:justify-start sm:justify-start gap-4 w-full max-w-[1440px]">
      <p className="w-[289.8px] pb-2 text-gray-500 text-2xl">{text}</p>
    </div>
  );
}

export default async function page({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const user: User | null = await currentUser();
  const userId = await getFaunaUserId(user?.id as string);

  const getTeamByName = await getTeamByMatchUserId(userId, searchParams.team as string);

  const events: EventData = await getEventByTeam(getTeamByName ?? "");

  const currentDate = new Date();

  const pastEvents = (events.data ?? []).filter((event) => {
    const eventDate = new Date(event.data?.event_date as string);

    eventDate.setDate(eventDate.getDate() + 1);

    return eventDate < currentDate;
  });

  const nextEvents = (events.data ?? []).filter((event) => {
    const eventDate = new Date(event.data?.event_date as string);

    eventDate.setDate(eventDate.getDate() + 1);

    return eventDate > currentDate;
  });

  return (
    <main className="px-4 2xl:px-0 gap-y-5 justify-center mx-auto w-full max-w-[1440px] ">
      <Tabs className="h-full w-full space-y-6" defaultValue="next-events">
        <div className="mx-auto w-[315px] sm:w-full max-w-[1440px] gap-y-2 flex flex-wrap items-center sm:justify-between">
          <TabsList>
            <TabsTrigger className="relative" value="next-events">
              Eventos próximos
            </TabsTrigger>
            <TabsTrigger value="past-events">Eventos Pasados</TabsTrigger>
          </TabsList>
          <EventSwitcher />
        </div>
        <TabsContent value="next-events">
          {!searchParams.team ? (
            <EmptyEvents text={"Selecciona un grupo"} />
          ) : (
            <>
              {nextEvents.length > 0 ? (
                <EventsDisplay events={nextEvents} />
              ) : (
                <EmptyEvents text={"No hay eventos próximos"} />
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value="past-events">
          {!searchParams.team ? (
            <EmptyEvents text={"Selecciona un grupo"} />
          ) : (
            <>
              {pastEvents.length > 0 ? (
                <EventsDisplay events={pastEvents} />
              ) : (
                <EmptyEvents text={"No hay eventos pasados"} />
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
