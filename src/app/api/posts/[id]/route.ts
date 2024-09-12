import { auth } from "@/auth";
import { getPostById, getPosts } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params: { id } }: Context) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPostById(id).then((data) => NextResponse.json(data));
}
