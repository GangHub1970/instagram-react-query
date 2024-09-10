import { User } from "next-auth";
import { client } from "./sanity";

export type OAuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export function addUser({ id, name, username, email, image }: OAuthUser) {
  const userDoc = {
    _id: id,
    _type: "user",
    username,
    name,
    email,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  };

  return client.createIfNotExists(userDoc);
}
