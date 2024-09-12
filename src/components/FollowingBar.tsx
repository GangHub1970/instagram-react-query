"use client";

import { meDataFetcher } from "@/lib/axios";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Avatar from "./Avatar";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["me"],
    queryFn: meDataFetcher,
  });
  const users = data?.following;

  return (
    <section className="flex justify-center items-center w-full p-4 shadow-md rounded-md min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }, index) => (
            <Link
              key={index}
              href={`/user/${username}`}
              className="flex flex-col items-center max-w-20"
            >
              <Avatar image={image} size="lg" highlight />
              <p className="text-center w-full text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
