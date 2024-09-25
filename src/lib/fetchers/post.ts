export async function postListDataFetcher() {
  return fetch("/api/posts").then((res) => res.json());
}

export async function postCreateFetcher(formData: FormData) {
  return fetch("/api/posts", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
}

export async function postDetailDataFetcher(id: string) {
  return fetch(`/api/posts/${id}`).then((res) => res.json());
}

export async function postLikeFetcher(id: string, liked: boolean) {
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, liked }),
  }).then((res) => res.json());
}

export async function postCommentFetcher(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}
