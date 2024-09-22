"use client";

import { ProfileUser } from "@/models/user";
import React, { useTransition } from "react";
import Button from "./ui/Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";

type Props = {
  user: ProfileUser;
  followers: number;
  onFollow: (action: number) => void;
};

export default function FollowButton({
  user: { username, id, image },
  followers,
  onFollow,
}: Props) {
  const router = useRouter();
  const { user: loggedInUser, setFollow } = useMe();
  const [isPending, startTransition] = useTransition();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";

  // const handleClick = () => {
  //   onFollow(following ? followers - 1 : followers + 1);
  //   startTransition(async () => {
  //     await setFollow({ id, username, followed: !!following, image });
  //     router.refresh();
  //   });
  // };

  const handleClick = () => {
    startTransition(async () => {
      onFollow(following ? followers - 1 : followers + 1);
      try {
        await setFollow({ id, username, followed: !!following, image });
        router.refresh();
      } catch (err) {
        onFollow(followers);
      }
    });
  };
  return (
    <>
      {showButton && (
        <Button
          text={text}
          onClick={handleClick}
          red={text === "Unfollow"}
          disabled={isPending}
        />
      )}
    </>
  );
}
