"use client";

import { createContext } from "react";

export type PageSectionHeader = {
  text: string;
  level: number;
  isActive: boolean;
};

type PageSectionContextValue = {
  headerList: PageSectionHeader[];
  setHeaderList: React.Dispatch<React.SetStateAction<PageSectionHeader[]>>;
};

export const PageSectionContext = createContext<
  PageSectionContextValue | undefined
>(undefined);
