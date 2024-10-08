"use client";

import React from "react";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";
import usePosts from "@/hooks/posts";

export default function PostList() {
  const { posts, isLoading } = usePosts();

  return (
    <section>
      {isLoading && (
        <div className="text-center my-32">
          <GridSpinner color="red" />
        </div>
      )}
      <ul className="my-4">
        {posts &&
          posts.map((post, index) => (
            // 렌더링되고 바로 보이는 포스트 이미지에 priority를 지정해준다.
            <PostListCard key={post.id} post={post} priority={index < 3} />
          ))}
      </ul>
    </section>
  );
}
