"use client";

import React from "react";
import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/utils/date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { postLikeFetcher } from "@/lib/fetchers/post";
import HeartFilledIcon from "./ui/icons/HeartFilledIcon";
import { SimplePost } from "@/models/post";
import ToggleButton from "./ui/ToggleButton";
import { HomeUser } from "@/models/user";
import { meDataFetcher, userBookmarkFetcher } from "@/lib/fetchers/user";
import BookmarkFilledIcon from "./ui/icons/BookmarkFilledIcon";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const queryClient = useQueryClient();
  const { data: user } = useQuery<HomeUser>({
    queryKey: ["me"],
    queryFn: meDataFetcher,
  });

  const liked = user ? likes.includes(user?.username) : false;
  const bookmarked = user && user ? user.bookmarks.includes(id) : false;
  const likeMutation = useMutation({
    mutationFn: ({ id, liked }: { id: string; liked: boolean }) =>
      postLikeFetcher(id, liked),
    onMutate: async () => {
      // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const newPost = {
        ...post,
        likes: liked
          ? likes.filter((item) => item !== user?.username)
          : [...likes, user?.username],
      };

      queryClient.setQueryData(["posts"], (oldPosts: SimplePost[]) => {
        return oldPosts.map((p: SimplePost) =>
          p.id === post.id ? newPost : p
        );
      });

      return { previousPosts };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err, { id, liked }, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
  });
  const bookmarkMutation = useMutation({
    mutationFn: ({ id, bookmarked }: { id: string; bookmarked: boolean }) =>
      userBookmarkFetcher(id, bookmarked),
    onMutate: async () => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ["me"] });

      const previousUser = queryClient.getQueryData(["me"]);
      const newUser = {
        ...user,
        bookmarks: bookmarked
          ? user.bookmarks.filter((b) => b !== id)
          : [...user.bookmarks, id],
      };

      queryClient.setQueryData(["me"], () => newUser);

      return { previousUser };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err, { id, bookmarked }, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["me"], context?.previousUser);
    },
  });

  const handleLike = (liked: boolean) => {
    likeMutation.mutate({ id, liked: !liked });
  };
  const handleBookmark = (bookmarked: boolean) => {
    bookmarkMutation.mutate({ id, bookmarked: !bookmarked });
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
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        <p className="my-2 text-xs text-neutral-500 uppercase">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
