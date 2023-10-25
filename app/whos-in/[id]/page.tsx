import Link from "next/link";

import {getEventById} from "@/app/api/actions";
import GuestUsers from "@/components/cards/guest-users";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Calendar} from "@/components/ui/calendar";
import CalendarClient from "@/components/calendar-client";

export default async function page({params}: {params: {id: string}}) {
  const eventData: any = await getEventById(params.id as string);

  let totalGuests = eventData.data[0]?.data.total_guests;
  let usersAttend = eventData.data[0]?.data.users_attend;
  let unconfirmed = eventData.data[0]?.data.unconfirmed;
  let attend = eventData.data[0]?.data.attend;
  let eventTitle = eventData.data[0]?.data.event_title;
  let placeDirection = eventData.data[0]?.data.place_direction;
  let placeName = eventData.data[0]?.data.place_name;
  let day = eventData.data[0]?.data.event_date;

  return (
    <main className="w-full grid pb-5 md:flex gap-5 justify-center px-5 md:px-10">
      <Card className="col-span-3 w-full max-w-[750px]">
        <CardHeader className="">
          <CardTitle className="text-lg font-bold mb-[-6px]">Datos del evento</CardTitle>
          <CardDescription>{eventTitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <section className="grid xl:flex gap-5">
            <div className="w-fit mx-auto xl:mx-0">
              <CalendarClient day={day} />
            </div>
            <aside className="grid content-between justify-center gap-2">
              <div className="grid grid-cols-2 content-start gap-x-6 gap-y-8">
                <div>
                  <span className="text-sm font-bold">Nombre del lugar:</span>
                  <p className="text-sm">{placeName}</p>
                </div>
                <div>
                  <span className="text-sm font-bold">Personas invitadas:</span>
                  <p className="text-sm">{attend}</p>
                </div>
                <div>
                  <span className="text-sm font-bold">Asisten:</span>
                  <p className="text-sm">{totalGuests}</p>
                </div>
                <div>
                  <span className="text-sm font-bold">Sin confirmar:</span>
                  <p className="text-sm">{unconfirmed}</p>
                </div>
              </div>
              <Link href={placeDirection} target="_blank">
                <Button>Ver dirección</Button>
              </Link>
            </aside>
          </section>
        </CardContent>
      </Card>
      <Card className="col-span-3 w-full lg:max-w-[350px]">
        <CardHeader className="">
          <CardTitle className="text-sm font-bold mb-[-6px]">Usuarios que asistirán</CardTitle>
          <CardDescription>Hay {totalGuests} personas invitadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <GuestUsers usersAttend={usersAttend} />
        </CardContent>
      </Card>
    </main>
  );
}
