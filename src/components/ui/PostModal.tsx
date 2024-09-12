import React from "react";
import CloseIcon from "./icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ children, onClose }: Props) {
  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <section
      onClick={handleBgClick}
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-900/70 z-50"
    >
      <button onClick={onClose} className="fixed top-0 right-0 p-8 text-white">
        <CloseIcon />
      </button>
      <div className="w-4/5 max-w-7xl h-3/5 bg-white">{children}</div>
    </section>
  );
}
