import { getPostById } from "@/services/post";
import { withSessionUser } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    id: string;
  };
};

export async function GET(_: NextRequest, { params: { id } }: Context) {
  return withSessionUser(async (user) => {
    return getPostById(id).then((data) => NextResponse.json(data));
  });
}
