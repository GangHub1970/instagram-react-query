import { auth } from "@/auth";
import { likePost, removeLikePost } from "@/services/post";
import { bookmarkPost, removeBookmarkPost } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: postId, bookmarked } = await req.json();

  if (!postId || bookmarked == null) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = bookmarked ? removeBookmarkPost : bookmarkPost;

  return request(user.id, postId).then((data) => NextResponse.json(data));
}
