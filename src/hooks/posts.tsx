"use client";

import {
  postCommentFetcher,
  postLikeFetcher,
  postListDataFetcher,
} from "@/lib/fetchers/post";
import { myPostDataFetcher } from "@/lib/fetchers/user";
import { Comment, SimplePost } from "@/models/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

type LikeMutation = {
  username: string;
  liked: boolean;
  post: SimplePost;
};

type CommentMutation = {
  comment: Comment;
  post: SimplePost;
};

export default function usePosts(queryKey: string[] = ["posts"]) {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<SimplePost[]>({
    queryKey,
    queryFn: () => {
      if (queryKey.length === 3) {
        const [_, username, query] = queryKey;
        return myPostDataFetcher(username, query);
      }
      return postListDataFetcher();
    },
  });

  const setLike = useCallback(
    useMutation({
      mutationFn: ({ liked, post }: LikeMutation) =>
        postLikeFetcher(post.id, liked),
      onMutate: async ({ username, liked, post }) => {
        // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
        await queryClient.cancelQueries({ queryKey });

        const previousPosts = queryClient.getQueryData(queryKey);
        const newPost = {
          ...post,
          likes: liked
            ? post.likes.filter((item) => item !== username)
            : [...post.likes, username],
        };

        queryClient.setQueryData(queryKey, (oldPosts: SimplePost[]) => {
          return oldPosts.map((p: SimplePost) =>
            p.id === post.id ? newPost : p
          );
        });

        return { previousPosts };
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (err, _, context) => {
        // 요청 실패 시 롤백
        queryClient.setQueryData(queryKey, context?.previousPosts);
      },
    }).mutate,
    []
  );

  const addComment = useCallback(
    useMutation({
      mutationFn: ({ post, comment }: CommentMutation) =>
        postCommentFetcher(post.id, comment.comment),
      onMutate: async ({ post }) => {
        // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
        await queryClient.cancelQueries({ queryKey });

        const previousPosts = queryClient.getQueryData(queryKey);
        const newPost = {
          ...post,
          comments: post.comments + 1,
        };

        queryClient.setQueryData(queryKey, (oldPosts: SimplePost[]) => {
          return oldPosts.map((p: SimplePost) =>
            p.id === post.id ? newPost : p
          );
        });

        return { previousPosts };
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
      onError: (err, _, context) => {
        // 요청 실패 시 롤백
        queryClient.setQueryData(queryKey, context?.previousPosts);
      },
    }).mutate,
    []
  );

  return { posts, isLoading, error, setLike, addComment };
}
