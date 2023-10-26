import GuestUsers from "@/components/cards/guest-users";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {SidebarNav} from "@/components/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Crear evento",
    value: "create-event",
  },
  {
    title: "Próximos eventos",
    value: "next-events",
  },
  {
    title: "Tus grupos",
    value: "your-groups",
  },
];

import {getEventById} from "./api/actions";

export default async function Home() {
  const eventData: any = await getEventById("379312836386488400" as string);
  let usersAttend = eventData.data[0]?.data.users_attend;

  return (
    <main className="w-full flex justify-center mx-auto max-w-[1440px] px-4 2xl:px-0">
      <div className="w-full space-b-6 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-3xl font-extrabold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Resumen de tus eventos y grupos de amigos.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-2 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
        </div>
      </div>
      {/* <section className="">
          <Card className="col-span-3 w-full max-w-[350px]">
            <CardHeader className="">
              <CardTitle className="text-sm font-bold mb-[-6px]">En este grupo</CardTitle>
              <CardDescription>Hay 3 personas en este grupo.</CardDescription>
            </CardHeader>
            <CardContent>
              <GuestUsers usersAttend={usersAttend} />
            </CardContent>
          </Card>
        </section> */}
    </main>
  );
}
