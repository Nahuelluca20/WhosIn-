import Link from "next/link";
import React from "react";

interface ListLinkProps {
  links: {
    title: string;
    href: string;
  }[];
}

export default function ListLink({links}: ListLinkProps) {
  return (
    <>
      <ul className="hidden lg:flex gap-4 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
