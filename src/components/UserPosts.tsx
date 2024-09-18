"use client";

import React, { useState } from "react";
import PostGrid from "./PostGrid";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";

const QUERIES = [
  {
    type: "posts",
    icon: <PostIcon className="w-4 h-4" />,
  },
  {
    type: "saved",
    icon: <BookmarkIcon className="w-4 h-4" />,
  },
  {
    type: "liked",
    icon: <HeartIcon className="w-4 h-4" />,
  },
];

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const [query, setQuery] = useState(QUERIES[0].type);

  return (
    <section>
      <ul className="flex justify-center">
        {QUERIES.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`flex mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline ml-3">{type.toUpperCase()}</span>
          </li>
        ))}
      </ul>
      <PostGrid query={query} username={username} />
    </section>
  );
}
