import {Avatar, AvatarImage, AvatarFallback} from "../ui/avatar";

function getTwoFirstLetters(text: string) {
  return text
    .split(" ")
    .map((word) => word[0].toLocaleUpperCase())
    .slice(0, 2)
    .join("");
}

export default function GuestUsers({
  usersAttend,
}: {
  usersAttend: {
    name: string;
    email: string;
  }[];
}) {
  console.log(getTwoFirstLetters("tata ramos"));

  return (
    <div className="space-y-8">
      {usersAttend &&
        usersAttend.map((user, index) => (
          <div key={index} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage alt="Avatar" src="/avatars/01.png" />
              <AvatarFallback>{getTwoFirstLetters(user.name)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
