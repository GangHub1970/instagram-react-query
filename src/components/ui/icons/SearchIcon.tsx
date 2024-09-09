import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {
  className?: string;
};

export default function SearchIcon({ className = "w-7 h-7" }: Props) {
  return <BiSearchAlt2 className={`${className}`} />;
}
