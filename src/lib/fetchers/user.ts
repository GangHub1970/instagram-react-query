import { instance } from "./axios";

export async function meDataFetcher() {
  return instance.get("/api/me").then((res) => res.data);
}

export async function searchUserDataFetcher(keyword: string) {
  return instance
    .get("/api/search", {
      params: {
        keyword,
      },
    })
    .then((res) => res.data);
}

export async function myPostDataFetcher(username: string, type: string) {
  return instance.get(`/api/user/${username}/${type}`).then((res) => res.data);
}
