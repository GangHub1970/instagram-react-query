import { auth } from "@/auth";
import { likePost, removeLikePost } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: postId, liked } = await req.json();

  if (!postId || liked == null) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = liked ? removeLikePost : likePost;

  return request(user.id, postId).then((data) => NextResponse.json(data));
}
