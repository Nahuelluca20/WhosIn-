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
      <DropdownMenuContent align="end">
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
