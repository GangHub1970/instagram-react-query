import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
};

export default function Button({ text, onClick, red }: Props) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-8 text-white font-bold border-none rounded-md leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      }`}
    >
      {text}
    </button>
  );
}
