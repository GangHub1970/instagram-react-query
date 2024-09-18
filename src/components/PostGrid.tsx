"use client";

import { myPostDataFetcher } from "@/lib/fetchers/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import GridSpinner from "./ui/GridSpinner";
import { SimplePost } from "@/models/post";
import PostGridCard from "./PostGridCard";

type Props = {
  query: string;
  username: string;
};

export default function PostGrid({ query, username }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<SimplePost[]>({
    queryKey: ["user_posts", username, query],
    queryFn: () => myPostDataFetcher(username, query),
  });

  return (
    <div className="text-center w-full">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
