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
    <header className="mb-10 border-b border-b-slate-400 mx-auto">
      <nav className="max-w-[1440px] flex justify-between mx-auto w-full items-center py-3 px-4 2xl:px-0">
        <div className="flex items-center gap-3">
          <Link href={"/"}>
            <h3 className="font-bold">WhosIn?</h3>
          </Link>
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
