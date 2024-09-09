import React from "react";

type ButtonSize = "md" | "lg";

type Props = {
  text: string;
  onClick: () => void;
  size?: ButtonSize;
};

export default function ColorButton({ text, onClick, size = "md" }: Props) {
  const { outerClass, innerClass } = getButtonSizeClass(size);

  return (
    <div
      className={`${outerClass} bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 rounded-md`}
    >
      <button
        onClick={onClick}
        className={`${innerClass} bg-white hover:bg-opacity-90 transition-opacity rounded`}
      >
        {text}
      </button>
    </div>
  );
}

function getButtonSizeClass(size: ButtonSize) {
  const outerClass = size === "md" ? "p-[0.2rem]" : "p-1";
  const innerClass = size === "md" ? "py-[0.2rem] px-2" : "py-2 px-6";

  return { outerClass, innerClass };
}
