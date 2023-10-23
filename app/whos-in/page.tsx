import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import {EventData, Ref} from "@/lib/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import EventsDisplay from "@/components/layouts/events/events-display";
import EventSwitcher from "@/components/navigation/event-switcher";

import {
  getEventByTeam,
  getFaunaUserId,
  getTeamByMatchUserId,
  getTeamsByUserId,
} from "../api/actions";

export default async function page({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined};
}) {
  const user: User | null = await currentUser();
  const userId = await getFaunaUserId(user?.id as string);
  const teamsByUserId: Ref[] = await getTeamsByUserId(userId);

  const getTeamByName = await getTeamByMatchUserId(userId, searchParams.team as string);

  const events: EventData = await getEventByTeam(getTeamByName ?? teamsByUserId[0].id);

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
        <div className="w-full gap-y-2 grid md:flex items-center justify-start md:justify-between">
          <TabsList>
            <TabsTrigger className="relative" value="next-events">
              Eventos próximos
            </TabsTrigger>
            <TabsTrigger value="past-events">Eventos Pasados</TabsTrigger>
          </TabsList>
          <EventSwitcher />
        </div>
        <TabsContent className="" value="next-events">
          {!searchParams.team ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
              <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">Selecciona un grupo</p>
            </div>
          ) : (
            <>
              {nextEvents.length > 0 ? (
                <EventsDisplay events={nextEvents} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
                  <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">
                    No hay eventos próximos
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent className="" value="past-events">
          {!searchParams.team ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
              <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">Selecciona un grupo</p>
            </div>
          ) : (
            <>
              {pastEvents.length > 0 ? (
                <EventsDisplay events={pastEvents} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1440px]">
                  <p className="order-2 w-[289.8px] pb-2 text-gray-500 text-2xl">
                    No hay eventos pasados
                  </p>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
