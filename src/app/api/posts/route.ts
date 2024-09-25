import { auth } from "@/auth";
import { createPost, getPosts } from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getPosts(user.username).then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const comment = form.get("comment")?.toString();
  const file = form.get("file") as Blob;

  if (!comment || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, comment, file).then((data) =>
    NextResponse.json(data)
  );
}
