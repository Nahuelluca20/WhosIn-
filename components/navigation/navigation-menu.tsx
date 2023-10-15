"use client";
import * as React from "react";
import Link from "next/link";
import {MenuIcon} from "lucide-react";
import {useAuth} from "@clerk/nextjs";

import {ModeToggle} from "../mode-toggle";
import {Button} from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import Avatar from "./avatar";
import ListLink from "./list-link";

const links = [
  {
    title: "Overview",
    href: "/",
  },
  {
    title: "My whosin",
    href: "/whos-in",
  },
  {
    title: "Profile",
    href: "/user-profile",
  },
  {
    title: "Help",
    href: "/help",
  },
];

export function NavigationMenu() {
  const {isLoaded, userId} = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <header className="mb-10">
      <nav className="flex justify-between w-full items-center py-2 px-4 md:px-10 border-b border-b-slate-400">
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <h1>WhosIn?</h1>
          </Link>
          {/* <div className="flex gap-3 items-center"> */}
          <ListLink links={links} />
          {/* </div> */}
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex lg:hidden">
              <Button className="outline-none" variant="ghost">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <DropdownMenuItem className="cursor-pointer">{link.title}</DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
