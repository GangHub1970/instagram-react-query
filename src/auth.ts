import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Google from "next-auth/providers/google";
import { addUser } from "./services/user";

const providers: Provider[] = [Google];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    const providerData = provider();
    return { id: providerData.id, name: providerData.name };
  } else {
    return { id: provider.id, name: provider.name };
  }
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user: { email, name, image }, profile }) {
      if (!email) return false;

      addUser({
        // id 값이 로그인 마다 변경되어 제공되어서 sub 또는 email 사용
        id: profile?.sub || email,
        name: name || "",
        username: email.split("@")[0],
        email,
        image,
      });

      return true;
    },
    async session({ session }) {
      const user = session?.user;

      if (user) {
        session.user = {
          ...user,
          username: user.email.split("@")[0] || "",
        };
      }
      return session;
    },
  },
});
