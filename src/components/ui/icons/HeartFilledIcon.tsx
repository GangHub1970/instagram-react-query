import React from "react";
import { IoMdHeart } from "react-icons/io";

type Props = {
  className?: string;
};

export default function HeartFilledIcon({ className }: Props) {
  return <IoMdHeart className={`${className || "w-7 h-7"} text-red-500`} />;
}
