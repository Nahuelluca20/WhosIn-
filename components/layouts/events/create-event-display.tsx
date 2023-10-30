import type {User} from "@clerk/nextjs/api";

import {currentUser} from "@clerk/nextjs";

import {CreateEventCard} from "@/components/cards/events/create-event-card";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {getTeamsNamesByUserId} from "@/app/api/teams";
import {getFaunaUserId} from "@/app/api/actions";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";

export default async function CreateEventDisplay() {
  const user: User | null = await currentUser();
  const userId = await getFaunaUserId(user?.id as string);
  const teams = await getTeamsNamesByUserId(userId);

  return (
    <DashboardTabContentLayout
      description={"Desde aquí puedes crear un evento para tu grupo"}
      title={"Crear Evento"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        <CreateEventCard />
        <ScrollArea className="max-h-[507.66px] w-full md:w-[261px] rounded-md border" type="auto">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Grupos</h4>
            {teams.map((team, index) => (
              <>
                <div key={index} className="text-sm">
                  {team}
                </div>
                <Separator className="my-2" />
              </>
            ))}
          </div>
        </ScrollArea>
      </div>
    </DashboardTabContentLayout>
  );
}
