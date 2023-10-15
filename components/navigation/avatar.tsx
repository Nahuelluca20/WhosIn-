"use client";
import {useTheme} from "next-themes";
import {SignOutButton, useUser} from "@clerk/nextjs";
import Link from "next/link";

import {Avatar as AvatarUI, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

export default function Avatar() {
  const {isLoaded, isSignedIn, user} = useUser();

  const {setTheme, theme} = useTheme();

  if (!isLoaded || !isSignedIn) {
    return <div className="w-[40px] h-[40px] rounded-full bg-gray-200 animate-pulse" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <AvatarUI>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </AvatarUI>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.username ?? user.firstName ?? ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.emailAddresses[0].emailAddress ?? ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border" />
        {theme !== "light" && (
          <DropdownMenuItem className="flex lg:hidden" onClick={() => setTheme("light")}>
            Theme: Light
          </DropdownMenuItem>
        )}
        {theme === "light" && (
          <DropdownMenuItem className="flex lg:hidden" onClick={() => setTheme("dark")}>
            Theme: Dark
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user-profile"}>User Profile</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
