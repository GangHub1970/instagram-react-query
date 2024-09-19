import { auth } from "@/auth";
import { commentPost } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: postId, comment } = await req.json();

  if (!postId || !comment) {
    return new Response("Bad Request", { status: 400 });
  }

  return commentPost(user.id, postId, comment).then((data) =>
    NextResponse.json(data)
  );
}
