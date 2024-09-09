"use client";

import React from "react";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFilledIcon from "./ui/icons/HomeFilledIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFilledIcon from "./ui/icons/SearchFilledIcon";
import PlusIcon from "./ui/icons/PlusIcon";
import PlusFilledIcon from "./ui/icons/PlusFilledIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";

const MENUS = [
  { icon: <HomeIcon />, filledIcon: <HomeFilledIcon />, href: "/" },
  { icon: <SearchIcon />, filledIcon: <SearchFilledIcon />, href: "/search" },
  { icon: <PlusIcon />, filledIcon: <PlusFilledIcon />, href: "/new" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 border-b border-neutral-200 bg-white z-40">
      <section className="flex justify-between mx-auto py-4 px-8 max-w-screen-xl w-full">
        <Link href="/">
          <h1 className="text-3xl font-bold">Instagram</h1>
        </Link>
        <nav className="content-center">
          <ul className="flex items-center gap-4">
            {MENUS.map(({ icon, filledIcon, href }) => (
              <li key={href}>
                <Link href={href}>{pathname === href ? filledIcon : icon}</Link>
              </li>
            ))}
            <li>
              <Link href="/signIn">
                <ColorButton text="Sign in" onClick={() => {}} />
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
