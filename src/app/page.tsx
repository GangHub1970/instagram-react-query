import { auth } from "@/auth";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getPosts } from "@/services/post";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(user.username),
  });
  return (
    <section className="flex flex-col md:flex-row mx-auto my-4 max-w-[850px] w-full">
      {/* flex박스에서는 최소 너비가 정해져있기 때문에 min-w-0 추가 */}
      <div className="p-4 w-full min-w-0 basis-3/4">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FollowingBar />
          <PostList />
        </HydrationBoundary>
      </div>
      <SideBar user={user} />
    </section>
  );
}
