"use client";

import React, { useState } from "react";
import PostGrid from "./PostGrid";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import { CacheKeyContext } from "@/contexts/CacheKeyContext";

const QUERIES = [
  {
    type: "posts",
    icon: <PostIcon className="w-4 h-4" />,
    title: "user posts",
  },
  {
    type: "saved",
    icon: <BookmarkIcon className="w-4 h-4" />,
    title: "saved posts",
  },
  {
    type: "liked",
    icon: <HeartIcon className="w-4 h-4" />,
    title: "liked posts",
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
        {QUERIES.map(({ type, icon, title }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`flex mx-12 p-4 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
          >
            <button className="scale-150 md:scale-100" aria-label={title}>
              {icon}
            </button>
            <span className="hidden md:inline ml-3">{type.toUpperCase()}</span>
          </li>
        ))}
      </ul>
      <CacheKeyContext.Provider
        value={{ queryKey: ["user_posts", username, query] }}
      >
        <PostGrid />
      </CacheKeyContext.Provider>
    </section>
  );
}
