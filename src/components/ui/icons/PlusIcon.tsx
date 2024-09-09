import React from "react";
import { BsPlusSquare } from "react-icons/bs";

type Props = {
  className?: string;
};

export default function PlusIcon({ className = "w-6 h-6" }: Props) {
  return <BsPlusSquare className={`${className}`} />;
}
