import React from "react";

type Props = {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
};

export default function Button({ text, onClick, red, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-8 text-white font-bold border-none rounded-md leading-4 ${
        red ? "bg-red-500" : "bg-sky-500"
      } ${disabled && "brightness-75"}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
