import { instance } from "./axios";

export async function postListDataFetcher() {
  return instance.get("/api/posts").then((res) => res.data);
}

export async function postDetailDataFetcher(id: string) {
  return instance.get(`/api/posts/${id}`).then((res) => res.data);
}

export async function postLikeFetcher(id: string, liked: boolean) {
  return instance.put("/api/likes", { id, liked }).then((res) => res.data);
}
