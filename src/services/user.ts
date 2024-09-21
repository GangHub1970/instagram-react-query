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

export async function getUserByUsername(username: string) {
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

export async function getSearchUsers(keyword: string) {
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

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == $username][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && username == $username]),
    }`,
      { username },
      {
        cache: "no-store",
      }
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    }));
}

export async function bookmarkPost(userId: string, postId: string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [{ _type: "reference", _ref: postId }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmarkPost(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref == "${postId}"]`])
    .commit();
}

export async function follow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append("following", [{ _type: "reference", _ref: targetId }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append("followers", [{ _type: "reference", _ref: myId }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unFollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref == "${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref == "${myId}"]`]))
    .commit();
}
