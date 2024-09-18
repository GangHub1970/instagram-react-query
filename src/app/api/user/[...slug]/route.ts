import { auth } from "@/auth";
import {
  getBookmarkedPosts,
  getLikedPosts,
  getMyPosts,
  getPostById,
} from "@/services/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};

export async function GET(_: NextRequest, { params: { slug } }: Context) {
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const [username, query] = slug;

  let request = getMyPosts;
  if (query === "liked") {
    request = getLikedPosts;
  } else if (query === "saved") {
    request = getBookmarkedPosts;
  }

  return request(username).then((data) => NextResponse.json(data));
}
