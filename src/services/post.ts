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
      `*[_type == "post" && author->username == $username
      || author._ref in *[_type == "user" && username == $username].following[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }
    `,
      {
        username,
      }
    )
    .then((posts) =>
      posts.map((post: SimplePost) => ({
        ...post,
        likes: post.likes || [],
        image: urlFor(post.image).width(800).url(),
      }))
    );
}

export async function getPostById(id: string) {
  return client
    .fetch(
      `*[_type == "post" && _id == $id][0]{
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
      }
    `,
      {
        id,
      }
    )
    .then((post) => ({
      ...post,
      likes: post.likes || [],
      image: urlFor(post.image).width(800).url(),
    }));
}
