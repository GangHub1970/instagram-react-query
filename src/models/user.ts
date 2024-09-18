export type AuthUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};

export type SimpleUser = Pick<AuthUser, "image" | "username">;

export type HomeUser = AuthUser & {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};

export type SearchUser = Omit<AuthUser, "email"> & {
  following: number;
  followers: number;
};

export type ProfileUser = SearchUser & {
  posts: number;
};
