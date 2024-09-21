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

export async function userBookmarkFetcher(id: string, bookmarked: boolean) {
  return instance
    .put("/api/bookmarks", { id, bookmarked })
    .then((res) => res.data);
}

export async function userFollowFetcher(id: string, followed: boolean) {
  return instance.put("/api/follow", { id, followed }).then((res) => res.data);
}
