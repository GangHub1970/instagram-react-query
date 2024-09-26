import { likePost, removeLikePost } from "@/services/post";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, liked } = await req.json();

    if (!postId || liked == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = liked ? removeLikePost : likePost;

    return request(user.id, postId).then((data) => NextResponse.json(data));
  });
}
