"use client";
import * as React from "react";
import Link from "next/link";
import {MenuIcon} from "lucide-react";
import {useAuth, useUser} from "@clerk/nextjs";
import {useEffect} from "react";

import {getFaunaUserId, getTeamsNamesByUserId} from "@/app/api/actions";

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
      <nav className="flex justify-between w-full items-center py-3 px-4 md:px-10 border-b border-b-slate-400">
        <div className="flex items-center gap-3">
          <h3 className="font-bold">WhosIn?</h3>
          <ListLink links={links} />
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
