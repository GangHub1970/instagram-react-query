import { auth } from "@/auth";
import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/signin");
  }
  return (
    <section className="flex flex-col md:flex-row mx-auto my-4 max-w-[850px] w-full">
      {/* flex박스에서는 최소 너비가 정해져있기 때문에 min-w-0 추가 */}
      <div className="w-full min-w-0 basis-3/4 md:pr-4">
        <FollowingBar />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
