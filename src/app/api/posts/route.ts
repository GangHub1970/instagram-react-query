import { auth } from "@/auth";
import { getPosts } from "@/services/post";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPosts(user.username).then((data) => NextResponse.json(data));
}
