"use client";

import { ReactNode, RefObject, useContext, useState } from "react";
import { PageSectionContext, PageSectionHeader } from "./PageSectionContext";

export const usePageSection = () => {
  const context = useContext(PageSectionContext);
  if (!context) {
    throw new Error("usePageSection must be used within a PageSectionProvider");
  }
  return context;
};

export const PageSectionProvider = ({ children }: { children: ReactNode }) => {
  const [headerList, setHeaderList] = useState<PageSectionHeader[]>([]);
  const [scrollRef, setScrollRef] = useState<RefObject<HTMLDivElement> | null>(
    null
  );
  return (
    <PageSectionContext.Provider
      value={{
        headerList,
        setHeaderList,
        scrollRef,
        setScrollRef,
      }}
    >
      {children}
    </PageSectionContext.Provider>
  );
};
