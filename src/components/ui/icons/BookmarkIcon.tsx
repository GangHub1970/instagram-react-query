import React from "react";
import { IoBookmarkOutline } from "react-icons/io5";

type Props = {
  className?: string;
};

export default function BookmarkIcon({ className }: Props) {
  return <IoBookmarkOutline className={className || "w-7 h-7"} />;
}
