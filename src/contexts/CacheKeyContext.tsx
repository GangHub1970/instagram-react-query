"use client";

import { createContext, useContext } from "react";

type CacheKey = {
  queryKey: string[];
};

export const CacheKeyContext = createContext<CacheKey>({ queryKey: ["posts"] });

export const useCacheKey = () => useContext(CacheKeyContext);
