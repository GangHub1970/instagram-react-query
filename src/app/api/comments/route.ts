import { commentPost } from "@/services/post";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: postId, comment } = await req.json();

    if (!postId || !comment) {
      return new Response("Bad Request", { status: 400 });
    }

    return commentPost(user.id, postId, comment).then((data) =>
      NextResponse.json(data)
    );
  });
}
