import { instance } from "./axios";

export async function postListDataFetcher() {
  return instance.get("/api/posts").then((res) => res.data);
}
