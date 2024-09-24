"use client";

import React from "react";
import GridSpinner from "./ui/GridSpinner";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";
import { useCacheKey } from "@/contexts/CacheKeyContext";

export default function PostGrid() {
  const cacheKey = useCacheKey();
  const { posts, isLoading } = usePosts(cacheKey.queryKey);

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
