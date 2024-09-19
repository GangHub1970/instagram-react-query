"use client";

import { postCommentFetcher, postDetailDataFetcher } from "@/lib/fetchers/post";
import { Comment, FullPost } from "@/models/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useFullPost(id: string) {
  const queryClient = useQueryClient();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<FullPost>({
    queryKey: ["post", id],
    queryFn: () => postDetailDataFetcher(id),
    staleTime: 0,
  });

  const addComment = useMutation({
    mutationFn: (comment: Comment) => postCommentFetcher(id, comment.comment),
    onMutate: async (comment) => {
      if (!post) return;
      // setQueryData가 진행되는 중에 ["posts"] 키를 가지는 query에 대한 다른 업데이트가 있는 경우를 무시하기 위해 캐시를 삭제해준다.
      await queryClient.cancelQueries({ queryKey: ["post", id] });

      const previousPost = queryClient.getQueryData(["post", id]);
      const newPost = {
        ...post,
        comments: [...post.comments, comment],
      };

      queryClient.setQueryData(["post", id], () => newPost);

      return { previousPost };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
    },
    onError: (err, _, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["post", id], context?.previousPost);
    },
  });

  return { post, isLoading, error, addComment };
}
