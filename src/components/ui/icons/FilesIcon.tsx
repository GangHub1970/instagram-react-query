import React from "react";
import { FaImages } from "react-icons/fa";

type Props = {
  className?: string;
};

export default function FilesIcon({ className }: Props) {
  return <FaImages className={className || "w-20 h-20"} />;
}
