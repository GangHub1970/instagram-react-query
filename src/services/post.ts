import { SimplePost } from "@/models/post";
import { client, urlFor } from "./sanity";

const simplePostProjection = `
  ...,
  "id": _id,
  "username": author->username,
  "userImage": author->image,
  "image": photo,
  "likes": likes[]->username,
  "text": comments[0].comment,
  "comments": count(comments),
  "createdAt": _createdAt
`;

export async function getPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
      || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

export async function getPostById(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "id": _id,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        "createdAt": _createdAt,
        comments[]{
          comment,
          "username": author->username,
          "image": author->image
        }
      }`
    )
    .then((post) => ({
      ...post,
      likes: post.likes || [],
      image: urlFor(post.image),
    }));
}

export async function getMyPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
        | order(_createdAt desc){
          ${simplePostProjection}
      }`,
      {},
      { cache: "no-store" }
    )
    .then(mapPosts);
}

export async function getBookmarkedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
        | order(_createdAt desc){
          ${simplePostProjection}
        }`,
      {},
      { cache: "no-store" }
    )
    .then(mapPosts);
}

export async function getLikedPosts(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
        | order(_createdAt desc){
          ${simplePostProjection}
        }`,
      {},
      { cache: "no-store" }
    )
    .then(mapPosts);
}

function mapPosts(posts: SimplePost[]) {
  return posts.map((post) => ({
    ...post,
    likes: post.likes || [],
    image: urlFor(post.image),
  }));
}

export async function likePost(userId: string, postId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append("likes", [{ _type: "reference", _ref: userId }])
    .commit({
      autoGenerateArrayKeys: true,
    });
}

export async function removeLikePost(userId: string, postId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref == "${userId}"]`])
    .commit();
}

export async function commentPost(
  userId: string,
  postId: string,
  comment: string
) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append("comments", [
      {
        author: {
          _ref: userId,
          _type: "reference",
        },
        comment,
      },
    ])
    .commit({
      autoGenerateArrayKeys: true,
    });
}
