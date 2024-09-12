import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // client 상태에서만 실행하기 위해
  if (typeof window === "undefined") {
    return null;
  }

  const modal = document.getElementById("portal") as HTMLElement;

  return createPortal(children, modal);
}
