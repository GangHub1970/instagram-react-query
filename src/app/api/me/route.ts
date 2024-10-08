import { getUserByUsername } from "@/services/user";
import { withSessionUser } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  return withSessionUser(async (user) => {
    return getUserByUsername(user.username).then((data) =>
      NextResponse.json(data)
    );
  });
}
