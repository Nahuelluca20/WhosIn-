import * as React from "react";
import Link from "next/link";
import {MenuIcon} from "lucide-react";

import Avatar from "../avatar";
import {ModeToggle} from "../mode-toggle";
import {Button} from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import ListLink from "./list-link";

const links = [
  {
    title: "Home",
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
  return (
    <header className="mb-10">
      <nav className="flex justify-between w-full items-center py-5 px-4 md:px-10 border-b-2 border-b-slate-400">
        <div>
          <Link href={"/"}>
            <h1>WhosIn?</h1>
          </Link>
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
        <div className="flex gap-3 items-center">
          <ListLink links={links} />
          <ModeToggle />
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
