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
      <div className="grow basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <SideBar user={user} />
    </section>
  );
}
