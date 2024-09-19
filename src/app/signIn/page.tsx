import SignIn from "@/components/SignIn";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instagram",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function SignInPage({ searchParams: { callbackUrl } }: Props) {
  return (
    <section className="flex justify-center items-center h-full">
      <SignIn callbackUrl={callbackUrl} />
    </section>
  );
}
