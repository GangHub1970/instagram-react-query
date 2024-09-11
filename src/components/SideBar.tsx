import { OAuthUser } from "@/models/user";
import React from "react";
import Avatar from "./Avatar";

type Props = {
  user: OAuthUser;
};

const TAGS = [
  "About",
  "Help",
  "Press",
  "API",
  "Jobs",
  "Privacy",
  "Terms",
  "Location",
  "Language",
];

export default async function SideBar({
  user: { name, username, image },
}: Props) {
  return (
    <aside className="flex flex-col gap-9 basis-1/4 p-4">
      <div className="flex items-center gap-4">
        {image && <Avatar image={image} />}
        <div>
          <p className="font-bold">{username}</p>
          <p className="text-neutral-600 font-semibold">{name}</p>
        </div>
      </div>
      <ul className="flex flex-wrap text-neutral-400 font-semibold">
        {TAGS.map((tag) => (
          <li key={tag} className="after:content-['﹒'] last:after:hidden">
            <span>{tag}</span>
          </li>
        ))}
      </ul>
      <p className="font-bold text-neutral-800">{`@Copyright INSTAGRAM from METAL`}</p>
    </aside>
  );
}
