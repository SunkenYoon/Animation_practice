"use client";

import { createContext, RefObject } from "react";

export type PageSectionHeader = {
  text: string;
  level: number;
  isActive: boolean;
};

type PageSectionContextValue = {
  headerList: PageSectionHeader[];
  setHeaderList: React.Dispatch<React.SetStateAction<PageSectionHeader[]>>;
  scrollRef: RefObject<HTMLDivElement> | null;
  setScrollRef: (ref: RefObject<HTMLDivElement>) => void;
};

export const PageSectionContext = createContext<
  PageSectionContextValue | undefined
>(undefined);
