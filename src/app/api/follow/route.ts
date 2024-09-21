import { auth } from "@/auth";
import { follow, unFollow } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id: targetId, followed } = await req.json();

  if (!targetId || followed == null) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = followed ? unFollow : follow;

  return request(user.id, targetId).then((data) => NextResponse.json(data));
}
