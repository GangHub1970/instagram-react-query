import SignIn from "@/components/SignIn";
import React from "react";

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
