import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
interface ListLinkProps {
  links: {
    title: string;
    href: string;
  }[];
}

function LinkComponent({text, href, pathname}: {text: string; href: string; pathname: string}) {
  const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");

  return (
    <Link
      className={`${
        isActive ? "text-primary" : "text-muted-foreground"
      } font-medium text-sm hover:text-primary`}
      href={href}
    >
      {text}
    </Link>
  );
}

export default function ListLink({links}: ListLinkProps) {
  const pathname = usePathname();

  return (
    <>
      <ul className="hidden lg:flex gap-3 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <LinkComponent href={link.href} pathname={pathname} text={link.title} />
          </li>
        ))}
      </ul>
    </>
  );
}
