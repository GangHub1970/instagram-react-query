import { AuthUser } from "@/models/user";
import { client } from "./sanity";

export function addUser({ id, name, username, email, image }: AuthUser) {
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

export function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == $username][0]{
      ...,
      "id": _id,
      following[]->{image, username},
      followers[]->{image, username},
      "bookmarks": bookmarks[]->_id
    }`,
    { username }
  );
}
