import {Separator} from "@/components/ui/separator";
import {SidebarNav} from "@/components/sidebar-nav";
import GroupDisplay from "@/components/layouts/groups/group-display";
import NextEventsDisplay from "@/components/layouts/events/next-events-display";

const sidebarNavItems = [
  {
    title: "Crear evento",
    value: "create-event",
    content: <div className="text-white min-w-[320px]">Crear Evento</div>,
  },
  {
    title: "Próximos eventos",
    value: "next-events",
    content: <NextEventsDisplay />,
  },
  {
    title: "Tus grupos",
    value: "your-groups",
    content: <GroupDisplay />,
  },
];

// import {getEventById} from "./api/actions";

export default async function Home() {
  // const eventData: any = await getEventById("379312836386488400" as string);
  // let usersAttend = eventData.data[0]?.data.users_attend;

  return (
    <main className="w-full flex justify-center mx-auto max-w-[1440px] px-4 2xl:px-0">
      <div className="w-full space-b-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-extrabold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Resumen de tus eventos y grupos de amigos.</p>
        </div>
        <Separator className="my-6" />
        <SidebarNav items={sidebarNavItems} />
      </div>
    </main>
  );
}
