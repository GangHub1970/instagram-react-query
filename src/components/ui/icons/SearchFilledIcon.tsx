import React from "react";
import { BiSolidSearch } from "react-icons/bi";

type Props = {
  className?: string;
};

export default function SearchFilledIcon({ className = "w-7 h-7" }: Props) {
  return <BiSolidSearch className={`${className}`} />;
}
