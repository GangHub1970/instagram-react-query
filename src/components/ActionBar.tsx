"use client";

import React from "react";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/utils/date";
import HeartFilledIcon from "./ui/icons/HeartFilledIcon";
import { Comment, SimplePost } from "@/models/post";
import ToggleButton from "./ui/ToggleButton";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";
import { useCacheKey } from "@/contexts/CacheKeyContext";

type Props = {
  post: SimplePost;
  onAddComment: (comment: Comment) => void;
  children?: React.ReactNode;
};

export default function ActionBar({ post, onAddComment, children }: Props) {
  const cacheKey = useCacheKey();
  const { id, likes, createdAt } = post;
  const { setLike } = usePosts(cacheKey.queryKey);
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user?.username) : false;
  const bookmarked = user && user ? user.bookmarks.includes(id) : false;

  const handleLike = (liked: boolean) => {
    user && setLike({ username: user.username, liked: !liked, post });
  };
  const handleBookmark = (bookmarked: boolean) => {
    user && setBookmark({ id, bookmarked: !bookmarked });
  };
  const handleAddComment = (comment: string) => {
    user &&
      onAddComment({
        username: user.username,
        image: user.image,
        comment,
      });
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
      <CommentForm onAddComment={handleAddComment} />
    </>
  );
}
