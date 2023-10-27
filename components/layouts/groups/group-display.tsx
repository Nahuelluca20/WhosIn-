import EventCard from "@/components/cards/events/event-card";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";

export default function GroupDisplay() {
  return (
    <DashboardTabContentLayout
      description={
        "Acá están todos los grupos de amigos que has creado. Si quieres crear un evento haz clicken alguno de ellos."
      }
      title={"Tus grupos"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </DashboardTabContentLayout>
  );
}
