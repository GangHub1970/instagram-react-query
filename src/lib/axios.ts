import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function meDataFetcher() {
  return instance.get("/api/me").then((res) => res.data);
}
