"use client";

import { meDataFetcher } from "@/lib/fetchers/user";
import { HomeUser, ProfileUser } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user: { username } }: Props) {
  const { data: loggedInUser } = useQuery<HomeUser>({
    queryKey: ["me"],
    queryFn: meDataFetcher,
  });
  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
}
