import React from "react";
import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center px-4 border-t border-neutral-300">
      <SmileIcon />
      <input
        type="text"
        placeholder="Add a comment..."
        className="ml-2 p-3 w-full border-none outline-none"
      />
      <button className="ml-2 font-bold text-sky-500">Post</button>
    </form>
  );
}
