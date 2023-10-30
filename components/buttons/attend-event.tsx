import {revalidatePath} from "next/cache";
import {User, currentUser} from "@clerk/nextjs/server";

import {attendEvent} from "@/app/api/actions";

import {Button} from "../ui/button";

export default function AttendEventButton({
  eventId,
  teamId,
  disabled,
}: {
  eventId: string;
  teamId: string;
  disabled: boolean;
}) {
  async function create() {
    "use server";
    const user: User | null = await currentUser();

    await attendEvent(
      user?.id ?? "",
      eventId,
      teamId,
      user?.emailAddresses[0].emailAddress ?? "",
      user?.firstName?.concat(" ", user?.lastName as string) ?? "",
    );

    revalidatePath(`/whos-in/${eventId}`);
  }

  return (
    <form action={create}>
      <Button disabled={disabled}>Asistir</Button>
    </form>
  );
}
