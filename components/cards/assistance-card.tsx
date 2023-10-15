import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";

export default function AssistanceCard() {
  return (
    <div className="">
      <Card>
        <CardHeader className="flex w-72 flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Event Title</CardTitle>
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
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Asisten 8</div>
          <p className="text-xs text-muted-foreground">faltan 10 por confirmar</p>
        </CardContent>
      </Card>
    </div>
  );
}
