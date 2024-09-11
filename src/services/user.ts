import { OAuthUser } from "@/models/user";
import { client } from "./sanity";

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
