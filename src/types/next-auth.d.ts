import { AuthUser } from "@/models/user";
import { AdapterUser } from "next-auth/adapters";

// next-auth 라이브러리의 Session interface 내부의 user에 username을 추가
declare module "next-auth" {
  interface Session {
    user: AuthUser;
  }
}
