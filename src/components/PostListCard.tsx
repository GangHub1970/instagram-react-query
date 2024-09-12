import { SimplePost } from "@/models/post";
import React from "react";
import Avatar from "./Avatar";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostListCard({ post, priority }: Props) {
  const { username, userImage, image, text, createdAt, likes, comments } = post;

  return (
    <li className="mb-4 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar image={userImage} highlight />
        <span className="ml-2 text-gray-900 font-bold">{username}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        className="w-full object-cover aspect-square"
      />
      <ActionBar
        text={text}
        likes={likes}
        username={username}
        createdAt={createdAt}
      />
      <CommentForm />
    </li>
  );
}
