import React from "react";
import Avatar from "./Avatar";

type Props = {
  username: string;
  image: string;
};

export default function PostUserAvatar({ username, image }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar image={image} highlight />
      <span className="ml-2 text-gray-900 font-bold">{username}</span>
    </div>
  );
}
