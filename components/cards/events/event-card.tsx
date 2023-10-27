import {Button} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function EventCard({canCreateEvent = false}: {canCreateEvent?: boolean}) {
  return (
    <>
      <Card className="min-w-[320px] sm:min-w-[270px] lg:min-w-[320px]">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription className="flex gap-1">
            Integrantes en el grupo: 8{" "}
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardDescription>
        </CardHeader>
        {canCreateEvent && (
          <CardFooter>
            <Button className="h-8 w-26 px-2">Crear evento</Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
