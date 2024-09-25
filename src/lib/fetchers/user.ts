export async function meDataFetcher() {
  return fetch("/api/me").then((res) => res.json());
}

export async function searchUserDataFetcher(keyword: string) {
  return fetch(`/api/search?keyword=${keyword}`).then((res) => res.json());
}

export async function myPostDataFetcher(username: string, type: string) {
  return fetch(`/api/user/${username}/${type}`).then((res) => res.json());
}

export async function userBookmarkFetcher(id: string, bookmarked: boolean) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id, bookmarked }),
  }).then((res) => res.json());
}

export async function userFollowFetcher(id: string, followed: boolean) {
  return fetch("/api/follow", {
    method: "PUT",
    body: JSON.stringify({ id, followed }),
  }).then((res) => res.json());
}
