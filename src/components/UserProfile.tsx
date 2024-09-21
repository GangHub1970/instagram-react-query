import React from "react";
import Avatar from "./Avatar";
import { ProfileUser } from "@/models/user";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser;
};

export default async function UserProfile({ user }: Props) {
  const { name, username, image, followers, following, posts } = user;
  const info = [
    { title: "posts", value: posts },
    { title: "followers", value: followers },
    { title: "following", value: following },
  ];

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-12 w-full border-b border-neutral-300">
      <Avatar image={image} size="xl" highlight />
      <div className="md:ml-10 basis-1/3">
        <div className="flex flex-col md:flex-row items-center">
          <h1 className="text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="flex gap-4 my-4">
          {info.map(({ title, value }, index) => (
            <li key={index}>
              <span className="mr-1 font-bold">{value}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className="text-center text-xl font-bold md:text-start">{name}</p>
      </div>
    </section>
  );
}
