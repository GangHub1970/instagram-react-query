import {
  meDataFetcher,
  userBookmarkFetcher,
  userFollowFetcher,
} from "@/lib/fetchers/user";
import { HomeUser } from "@/models/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type BookmarkMutation = {
  id: string;
  bookmarked: boolean;
};

type FollowMutation = {
  id: string;
  username: string;
  image?: string;
  followed: boolean;
};

export default function useMe() {
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<HomeUser>({
    queryKey: ["me"],
    queryFn: meDataFetcher,
  });

  const setBookmark = useMutation({
    mutationFn: ({ id, bookmarked }: BookmarkMutation) =>
      userBookmarkFetcher(id, bookmarked),
    onMutate: async ({ id, bookmarked }) => {
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
    onError: (err, _, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["me"], context?.previousUser);
    },
  }).mutate;

  const setFollow = useMutation({
    mutationFn: ({ id, followed }: FollowMutation) =>
      userFollowFetcher(id, followed),
    onMutate: async ({ username, followed, image }) => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ["me"] });

      const previousUser = queryClient.getQueryData(["me"]);
      const newUser = {
        ...user,
        following: followed
          ? user.following.filter((b) => b.username !== username)
          : [...user.following, { username, image }],
      };

      queryClient.setQueryData(["me"], () => newUser);

      return { previousUser };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err, _, context) => {
      // 요청 실패 시 롤백
      queryClient.setQueryData(["me"], context?.previousUser);
    },
  }).mutateAsync;

  return { user, isLoading, error, setBookmark, setFollow };
}
