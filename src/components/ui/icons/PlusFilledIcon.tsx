import React from "react";
import { BsPlusSquareFill } from "react-icons/bs";

type Props = {
  className?: string;
};

export default function PlusFilledIcon({ className = "w-6 h-6" }: Props) {
  return <BsPlusSquareFill className={`${className}`} />;
}
