import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";
import React from "react";

// 해당 페이지를 SSR로 설정할 수 있다.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default function SearchPage() {
  return <UserSearch />;
}
