import EventCard from "@/components/cards/events/event-card";

import DashboardTabContentLayout from "../dashboard/dashboard-tab-content-layout";

export default function NextEventsDisplay() {
  return (
    <DashboardTabContentLayout
      description={"Estos son los siguientes 3 eventos a los que tienes que asistir"}
      title={"Próximos Eventos"}
    >
      <div className="flex gap-5 justify-center md:justify-start w-full flex-wrap max-w-[1000px]">
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </DashboardTabContentLayout>
  );
}
