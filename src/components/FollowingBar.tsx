"use client";

import { meDataFetcher } from "@/lib/fetchers/user";
import { HomeUser } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Avatar from "./Avatar";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import ScrollableBar from "./ui/ScrollableBar";

export default function FollowingBar() {
  const { data, isLoading, error } = useQuery<HomeUser>({
    queryKey: ["me"],
    queryFn: meDataFetcher,
  });
  const users = data?.following;

  return (
    // react-multi-carousel의 컴포넌트 z-index가 높아서 다른 컴포넌트를 가리기때문에
    // relative로 내부 요소의 부모요소로 section 태그를 설정해주고 section 태그의 z-index를 낮춰줌으로써 해결
    <section className="relative flex justify-center items-center p-4 w-full shadow-md rounded-md min-h-[90px] overflow-x-auto z-0">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {[...users, ...users, ...users].map(({ username, image }, index) => (
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
