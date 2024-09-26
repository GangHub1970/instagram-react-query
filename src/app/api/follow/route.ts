import { follow, unFollow } from "@/services/user";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id: targetId, followed } = await req.json();

    if (!targetId || followed == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = followed ? unFollow : follow;

    return request(user.id, targetId).then((data) => NextResponse.json(data));
  });
}
