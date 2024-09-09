import React from "react";
import { AiOutlineHome } from "react-icons/ai";

type Props = {
  className?: string;
};

export default function HomeIcon({ className = "w-7 h-7" }: Props) {
  return <AiOutlineHome className={`${className}`} />;
}
