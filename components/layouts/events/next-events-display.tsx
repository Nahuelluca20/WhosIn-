import {currentUser} from "@clerk/nextjs";
import {User} from "@clerk/nextjs/server";

import EventCard from "@/components/cards/events/event-card";
import {getFaunaUserId, getAllEventsByUser} from "@/app/api/actions";
import {EventData} from "@/lib/types";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";

import EventsDisplay from "./events-display";

export default async function NextEventsDisplay() {
  const user: User | null = await currentUser();
  const userId = await getFaunaUserId(user?.id as string);
  const events: EventData = await getAllEventsByUser(userId ?? "");

  return (
    <DashboardTabContentLayout
      description={"Estos son los siguientes 3 eventos a los que tienes que asistir"}
      title={"Próximos Eventos"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        {/* <EventsDisplay /> */}
      </div>
    </DashboardTabContentLayout>
  );
}
