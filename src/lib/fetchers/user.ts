import { instance } from "./axios";

export async function meDataFetcher() {
  return instance.get("/api/me").then((res) => res.data);
}
