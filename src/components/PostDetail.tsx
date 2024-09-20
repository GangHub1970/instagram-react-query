import { Comment, SimplePost } from "@/models/post";
import Image from "next/image";
import React from "react";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hooks/post";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image } = post;
  const { post: fullPost, addComment } = useFullPost(id);
  const comments = fullPost?.comments;

  const handleAddComment = (comment: Comment) => {
    addComment(comment);
  };
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        {/* 너비를 650px로 지정하고 높이는 부모 컨테이너를 채우게 */}
        <Image
          src={image}
          alt={`photo by ${username}`}
          fill
          sizes="650px"
          className="object-cover"
        />
      </div>
      <div className="basis-2/5 flex flex-col w-full">
        <PostUserAvatar username={username} image={userImage} />
        <ul className="mb-1 p-4 h-full border-t border-gray-100 overflow-y-auto">
          {comments &&
            comments.map(
              ({ image, username: commentUserName, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="sm"
                    highlight={commentUserName === username}
                  />
                  <div className="ml-2">
                    <span className="mr-1 font-bold">{commentUserName}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onAddComment={handleAddComment} />
      </div>
    </section>
  );
}
