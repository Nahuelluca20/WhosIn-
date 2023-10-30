import {currentUser} from "@clerk/nextjs";
import {User} from "@clerk/nextjs/server";

import EventCard from "@/components/cards/events/event-card";
import {getFaunaUserId} from "@/app/api/actions";
import {getTeamsByUserId} from "@/app/api/teams";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";

export default async function GroupDisplay() {
  const user: User | null = await currentUser();

  const userId = await getFaunaUserId(user?.id as string);
  const teams = await getTeamsByUserId(userId);

  return (
    <DashboardTabContentLayout
      description={
        "Acá están todos los grupos de amigos que has creado. Si quieres crear un evento haz clicken alguno de ellos."
      }
      title={"Tus grupos"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        {teams?.map((team) => (
          <EventCard
            key={team.id}
            canCreateEvent
            eventName={team.name}
            members={String(team.members?.length)}
          />
        ))}
      </div>
    </DashboardTabContentLayout>
  );
}
