import Link from "next/link";

import {getEventById} from "@/app/api/actions";
import GuestUsers from "@/components/cards/guest-users";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Calendar} from "@/components/ui/calendar";

export default async function page({params}: {params: {id: string}}) {
  const eventData: any = await getEventById(params.id as string);

  // console.log(eventData.data[0]);
  let totalGuests = eventData.data[0]?.data.total_guests;
  let eventTitle = eventData.data[0]?.data.event_title;
  let placeDirection = eventData.data[0]?.data.place_direction;
  let dayFormat = new Date(eventData.data[0]?.data.event_date);

  return (
    <main className="w-full flex gap-5 justify-center px-5 md:px-10">
      <Card className="col-span-3 w-full max-w-[750px]">
        <CardHeader className="">
          <CardTitle className="text-lg font-bold mb-[-6px]">Datos del evento</CardTitle>
          <CardDescription>{eventTitle}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="w-fit">
            <Calendar className="rounded-md border" mode="single" selected={dayFormat} />
          </div>

          <Link href={placeDirection} target="_blank">
            <Button className="text-white">Ver dirección</Button>
          </Link>
        </CardContent>
      </Card>
      <Card className="col-span-3 w-full max-w-[450px]">
        <CardHeader className="">
          <CardTitle className="text-sm font-bold mb-[-6px]">Usuarios que asistirán</CardTitle>
          <CardDescription>Hay {totalGuests} personas invitadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <GuestUsers />
        </CardContent>
      </Card>
    </main>
  );
}
