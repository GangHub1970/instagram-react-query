import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/services/user";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    username: string;
  };
};

export default async function AboutPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-screen-xl">
      <UserProfile user={user} />
      <UserPosts username={user.username} />
    </section>
  );
}
