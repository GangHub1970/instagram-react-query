import { bookmarkPost, removeBookmarkPost } from "@/services/user";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, bookmarked } = await req.json();

    if (!postId || bookmarked == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = bookmarked ? removeBookmarkPost : bookmarkPost;

    return request(user.id, postId).then((data) => NextResponse.json(data));
  });
}
