"use client";

import { ProfileUser } from "@/models/user";
import React from "react";
import Button from "./ui/Button";
import useMe from "@/hooks/me";
import { useRouter } from "next/navigation";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user: { username, id, image } }: Props) {
  const router = useRouter();
  const { user: loggedInUser, setFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";

  const handleClick = async () => {
    await setFollow({ id, username, followed: !!following, image });
    router.refresh();
  };
  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleClick} red={text === "Unfollow"} />
      )}
    </>
  );
}
