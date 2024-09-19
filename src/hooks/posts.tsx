"use client";

import {
  postCommentFetcher,
  postLikeFetcher,
  postListDataFetcher,
} from "@/lib/fetchers/post";
import { Comment, SimplePost } from "@/models/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type LikeMutation = {
  username: string;
  liked: boolean;
  post: SimplePost;
};

type CommentMutation = {
  comment: Comment;
  post: SimplePost;
};

export default function usePosts() {
  const queryClient = useQueryClient();
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<SimplePost[]>({
    queryKey: ["posts"],
    queryFn: postListDataFetcher,
  });

  const setLike = useMutation({
    mutationFn: ({ liked, post }: LikeMutation) =>
      postLikeFetcher(post.id, liked),
    onMutate: async ({ username, liked, post }) => {
      // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const newPost = {
        ...post,
        likes: liked
          ? post.likes.filter((item) => item !== username)
          : [...post.likes, username],
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
    onError: (err, _, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
  });

  const addComment = useMutation({
    mutationFn: ({ post, comment }: CommentMutation) =>
      postCommentFetcher(post.id, comment.comment),
    onMutate: async ({ post }) => {
      // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData(["posts"]);
      const newPost = {
        ...post,
        comments: post.comments + 1,
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
    onError: (err, _, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["posts"], context?.previousPosts);
    },
  });

  return { posts, isLoading, error, setLike, addComment };
}
