"use client";

import { SimplePost } from "@/models/post";
import React, { useState } from "react";
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostListCard({ post, priority }: Props) {
  const { username, userImage, image } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <ActionBar post={post} />
      <CommentForm />
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
