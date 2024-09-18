"use client";

import { SimplePost } from "@/models/post";
import Image from "next/image";
import React, { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./ui/PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
  post: SimplePost;
  priority: boolean;
};

export default function PostGridCard({ post, priority = false }: Props) {
  const { username, image } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();

  const handleOpenPost = () => {
    if (!session?.user) {
      return signIn();
    }

    setOpenModal(true);
  };
  return (
    <div className="relative w-full aspect-square">
      <Image
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        className="object-cover"
        onClick={handleOpenPost}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
