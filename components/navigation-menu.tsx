import * as React from "react";
import Link from "next/link";

import Avatar from "./avatar";
import {ModeToggle} from "./mode-toggle";

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
    <header>
      <nav className="flex justify-between w-full items-center py-5 px-10 border-b-2 border-b-slate-400">
        <div>
          <Link href={"/"}>
            <h1>WhosIn?</h1>
          </Link>
        </div>
        <ul className="flex gap-8 items-center">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 items-center">
          <ModeToggle />
          <Avatar />
        </div>
      </nav>
    </header>
  );
}
