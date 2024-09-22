"use client";

import React, { useOptimistic } from "react";
import Avatar from "./Avatar";
import { ProfileUser } from "@/models/user";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

// INFOS 배열을 const로 선언하여, 각 요소가 리터럴 타입으로 처리되게 함
const INFOS = ["posts", "followers", "following"] as const;

export default function UserProfile({ user }: Props) {
  const { name, username, image, followers, following, posts } = user;
  const [optimisticFollowers, addOptimisticFollowers] = useOptimistic(
    { posts, followers, following },
    (state, newFollowers: number) => ({
      ...state,
      followers: newFollowers,
    })
  );

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-12 w-full border-b border-neutral-300">
      <Avatar image={image} size="xl" highlight />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton
            user={user}
            followers={followers}
            onFollow={addOptimisticFollowers}
          />
        </div>
        <ul className="flex gap-4 my-4">
          {INFOS.map((info, index) => (
            <li key={index}>
              <span className="mr-1 font-bold">
                {optimisticFollowers[info]}
              </span>
              {info}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold md:text-start">{name}</p>
      </div>
    </section>
  );
}
