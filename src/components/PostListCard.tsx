"use client";

import { Comment, SimplePost } from "@/models/post";
import React, { useState } from "react";
import Image from "next/image";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hooks/posts";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostListCard({ post, priority }: Props) {
  const { username, userImage, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const { addComment } = usePosts();

  const handleAddComment = (comment: Comment) => {
    addComment({ post, comment });
  };
  return (
    <li className="mb-4 rounded-lg shadow-md border border-gray-200">
      <PostUserAvatar username={username} image={userImage} />
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        className="w-full object-cover aspect-square"
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onAddComment={handleAddComment}>
        {text && (
          <p>
            <span className="mr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        {comments > 1 && (
          <button
            className="font-bold text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </li>
  );
}
