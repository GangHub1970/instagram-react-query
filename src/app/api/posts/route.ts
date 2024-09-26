import { createPost, getPosts } from "@/services/post";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) => {
    return getPosts(user.username).then((data) => NextResponse.json(data));
  });
}

export async function POST(req: NextRequest) {
  return withSessionUser(async (user) => {
    const form = await req.formData();
    const comment = form.get("comment")?.toString();
    const file = form.get("file") as Blob;

    if (!comment || !file) {
      return new Response("Bad Request", { status: 400 });
    }

    return createPost(user.id, comment, file).then((data) =>
      NextResponse.json(data)
    );
  });
}
