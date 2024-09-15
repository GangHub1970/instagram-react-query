"use client";

import useDebounce from "@/hooks/debounce";
import { searchUserDataFetcher } from "@/lib/fetchers/user";
import { SearchUser } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import React, { ChangeEvent, FormEvent, useState } from "react";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<SearchUser[]>({
    queryKey: ["search", "user", debouncedKeyword],
    queryFn: () => searchUserDataFetcher(debouncedKeyword),
  });

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className="flex flex-col items-center mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="my-8 w-full">
        <input
          type="text"
          placeholder="Search for a Name or Username."
          autoFocus
          className="p-3 w-full text-xl outline-none border border-gray-400"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </form>
      {error && <p>무언가 잘못되었음 😅</p>}
      {isLoading && <GridSpinner />}
      {!error && !isLoading && users?.length === 0 && (
        <p>찾는 사용자가 없음 🙃</p>
      )}
      <ul className="p-4 w-full">
        {users &&
          users.map((user) => <UserCard key={user.username} user={user} />)}
      </ul>
    </section>
  );
}
