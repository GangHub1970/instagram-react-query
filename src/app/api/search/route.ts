import { getSearchUsers } from "@/services/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const keyword = searchParams.get("keyword") ?? "";

  return getSearchUsers(keyword).then((data) => NextResponse.json(data));
}
