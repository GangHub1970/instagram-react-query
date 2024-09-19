"use client";

import React from "react";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/utils/date";
import HeartFilledIcon from "./ui/icons/HeartFilledIcon";
import { SimplePost } from "@/models/post";
import ToggleButton from "./ui/ToggleButton";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";

type Props = {
  post: SimplePost;
  children?: React.ReactNode;
};

export default function ActionBar({ post, children }: Props) {
  const { id, likes, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user?.username) : false;
  const bookmarked = user && user ? user.bookmarks.includes(id) : false;

  const handleLike = (liked: boolean) => {
    user && setLike.mutate({ username: user.username, liked: !liked, post });
  };
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark.mutate({ id, bookmarked: !bookmarked });
  };
  return (
    <>
      <div className="flex justify-between items-center my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFilledIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFilledIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {children}
        <p className="my-2 text-xs text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
