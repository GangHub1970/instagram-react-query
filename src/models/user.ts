export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export type SimpleUser = Pick<AuthUser, "image" | "username">;

export type User = {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
