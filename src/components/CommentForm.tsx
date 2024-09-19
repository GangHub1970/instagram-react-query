import React, { ChangeEvent, FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";
import { Comment } from "@/models/post";
import useMe from "@/hooks/me";

type Props = {
  onAddComment: (comment: Comment) => void;
};

export default function CommentForm({ onAddComment }: Props) {
  const [text, setText] = useState("");
  const { user } = useMe();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    user &&
      onAddComment({
        comment: text,
        username: user?.username,
        image: user?.image,
      });
    setText("");
  };
  return (
    <form
      className="flex items-center px-4 border-t border-neutral-300"
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        type="text"
        placeholder="Add a comment..."
        className="ml-2 p-3 w-full border-none outline-none"
        value={text}
        onChange={handleChange}
      />
      <button className="ml-2 font-bold text-sky-500" disabled={!text}>
        Post
      </button>
    </form>
  );
}
