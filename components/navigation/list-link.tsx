// "use client";
import Link from "next/link";
import React from "react";
import {MenuIcon} from "lucide-react";

import {Button} from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface ListLinkProps {
  links: {
    title: string;
    href: string;
  }[];
}

export default function ListLink({links}: ListLinkProps) {
  return (
    <>
      <ul className="hidden lg:flex gap-8 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
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
    </>
  );
}
