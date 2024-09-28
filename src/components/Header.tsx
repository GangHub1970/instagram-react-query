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
import { signIn, signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";

const MENUS = [
  {
    icon: <HomeIcon />,
    filledIcon: <HomeFilledIcon />,
    href: "/",
    title: "home",
  },
  {
    icon: <SearchIcon />,
    filledIcon: <SearchFilledIcon />,
    href: "/search",
    title: "search users",
  },
  {
    icon: <PlusIcon />,
    filledIcon: <PlusFilledIcon />,
    href: "/new",
    title: "new post",
  },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignInClick = () => {
    if (pathname === "/signin") return;

    signIn();
  };
  return (
    <header className="sticky top-0 border-b border-neutral-200 bg-white z-40">
      <section className="flex justify-between mx-auto py-4 px-8 max-w-screen-xl w-full">
        <Link href="/" aria-label="home">
          <h1 className="text-3xl font-bold">Instagram</h1>
        </Link>
        <nav className="content-center">
          <ul className="flex items-center gap-4">
            {MENUS.map(({ icon, filledIcon, href, title }) => (
              <li key={href}>
                <Link href={href} aria-label={title}>
                  {pathname === href ? filledIcon : icon}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <Link href={`/user/${user.username}`} aria-label="my profile">
                  <Avatar image={user.image} size="sm" highlight />
                </Link>
              </li>
            )}
            <li>
              {session ? (
                <ColorButton text="Sign out" onClick={signOut} />
              ) : (
                <ColorButton text="Sign in" onClick={handleSignInClick} />
              )}
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
