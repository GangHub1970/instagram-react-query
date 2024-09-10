"use client";

import React from "react";
import ColorButton from "./ui/ColorButton";
import { signIn } from "next-auth/react";
import { providerMap } from "@/auth";

type Props = {
  callbackUrl: string;
};

export default function SignIn({ callbackUrl }: Props) {
  return (
    <ul>
      {Object.values(providerMap).map(({ id, name }) => (
        <li key={id}>
          <ColorButton
            text={`Sign in with ${name}`}
            onClick={() => signIn(id, { callbackUrl })}
            size="lg"
          />
        </li>
      ))}
    </ul>
  );
}
