import * as React from "react";
import Link from "next/link";

import Avatar from "../avatar";
import {ModeToggle} from "../mode-toggle";

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
        <ListLink links={links} />
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
