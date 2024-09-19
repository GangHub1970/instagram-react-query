import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";

type Props = {
  className?: string;
};

export default function HeartIcon({ className }: Props) {
  return <IoMdHeartEmpty className={className || "w-7 h-7"} />;
}
