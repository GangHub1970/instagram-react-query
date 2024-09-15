import { SearchUser } from "@/models/user";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser;
};

export default function UserCard({ user }: Props) {
  const { name, username, following, followers, image } = user;

  return (
    <li>
      <Link
        href={`/user/${username}`}
        className="flex items-center mb-4 p-4 w-full bg-white hover:bg-neutral-50 rounded-sm border border-neutral-300"
      >
        <Avatar image={image} />
        <div className="ml-4 text-neutral-500">
          <p className="text-black font-bold leading-4">{username}</p>
          <p>{name}</p>
          <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
        </div>
      </Link>
    </li>
  );
}
