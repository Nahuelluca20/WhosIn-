import GuestUsers from "@/components/cards/guest-users";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";

import {getEventById} from "./api/actions";

export default async function Home() {
  const eventData: any = await getEventById("379312836386488400" as string);
  let usersAttend = eventData.data[0]?.data.users_attend;

  return (
    <main className="px-4 w-full max-w-[1440px] flex justify-center">
      <div className="min-w-[350px]">
        <h1 className="text-3xl font-extrabold">Dashboard</h1>
        <h2 className="text-xs font-normal mt-[1px] text-muted-foreground">
          Your favorite podcasts. Updated daily.
        </h2>
        <section className="">
          <Card className="col-span-3 w-full max-w-[350px]">
            <CardHeader className="">
              <CardTitle className="text-sm font-bold mb-[-6px]">En este grupo</CardTitle>
              <CardDescription>Hay 3 personas en este grupo.</CardDescription>
            </CardHeader>
            <CardContent>
              <GuestUsers usersAttend={usersAttend} />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
