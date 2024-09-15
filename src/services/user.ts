import { AuthUser, SearchUser } from "@/models/user";
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

export function getSearchUsers(keyword: string) {
  const query = keyword
    ? "&& (username match $keyword || name match $keyword)"
    : "";

  return client
    .fetch(
      `*[_type == "user" ${query}]{
        "id": _id,
        username,
        name,
        image,
        "following": count(following),
        "followers": count(followers),
      }
    `,
      { keyword: `*${keyword}*` }
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}
